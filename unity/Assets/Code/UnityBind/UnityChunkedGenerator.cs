using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using Assets.SimpleGenerator.TerrainModules;
using Code.Core;
using Code.Modifiers.Biomes;
using Code.Util;
using UnityEngine;
using UnityEngine.Networking;
using Cursor = Code.UnityBind.Cursor;

namespace Assets.SimpleGenerator
{
    [Serializable]
    public class Project
    {
        public TerrainSettings TerrainSettings;
        public TerrainGrass[] TerrainGrass;
        public TerrainTexture[] TerrainSplatMaterials;

        public void DownloadTextures()
        {
            foreach (var terrainSplatMaterial in TerrainSplatMaterials)
            {
                terrainSplatMaterial.DownloadTextures();
            }
        }
    }

    [Serializable]
    public class TerrainSyncData
    {
        public int Index;
        public string TreeData;
    }
    
    [RequireComponent (typeof (Cursor))]
    public class UnityChunkedGenerator : MonoBehaviour
    {
        public Project Project;
        public TerrainObject[] TerrainObjects;
        private List<UnityChunk> _chunks;
        public TerrainSettings TerrainSettings;

        public Vector2 CurrentChunkPosition;

        public int ViewDistance;

        public CoreImpl Core;
        private List<UnityChunk> _refreshingChunks;
        
        [DllImport("__Internal")]
        private static extern void InitTerrainStorages(int amount);
        
        public void Refresh(string project)
        {
            Project = JsonUtility.FromJson<Project>(project);
            Project.DownloadTextures();
            Debug.Log("Textures Downloaded!");
            if (_chunks != null)
            {
                foreach (var chunk in _chunks)
                {
                    Destroy(chunk.gameObject);
                }
            }

            _chunks = CreateChunks(Project);
            InitTerrainStorages(_chunks.Count);
            _refreshingChunks = new List<UnityChunk>();
            StartCoroutine(Create());
        }
        
        
        private IEnumerator Create()
        {
            yield return new WaitForFixedUpdate();
            CoreUtils.Foreach(new Pair(ViewDistance * 2 + 1,ViewDistance * 2 + 1), position =>
            {
                var current = _chunks[position.Y * (ViewDistance * 2 + 1) + position.X];
                current.Position = position + new Pair(-ViewDistance, -ViewDistance) + CurrentChunkPosition;
                current.Refresh();
            });
        }

        public void Update()
        {
            if (Input.GetKeyDown(KeyCode.R))
            {
                Refresh(@"{""EditorJson"":"""",""TerrainGrass"":[],""TerrainSplatMaterials"":[{""AlbedoPath"":""/Users/nesla/Documents/Repos/LandscapeGen/t.png"",""Metallic"":0,""NormalMapPath"":""/Users/nesla/Documents/Repos/LandscapeGen/t.png"",""Offset"":{""x"":0,""y"":0},""Size"":{""x"":0,""y"":0},""Smoothness"":0}]}");
            }
        }
        
        private List<UnityChunk> CreateChunks(Project project)
        {
            var chunksCount = (ViewDistance * 2 + 1) * (ViewDistance * 2 + 1);
            var chunks = new List<UnityChunk>(chunksCount);

            for (var y = -ViewDistance; y <= ViewDistance; y++)
            {
                for (var x = -ViewDistance; x <= ViewDistance; x++)
                {
                    var terrain = TerrainSettings.CreateTerrain();
                    terrain.gameObject.transform.parent = transform;
                    /*foreach (var splat in project.TerrainSplatMaterials)
                    {
                        splat.ApplyTexture(terrain);
                    }

                    foreach (var grass in project.TerrainGrass)
                    {
                        grass.ApplyGrass(terrain);
                    }
                    */
                    var chunk = terrain.gameObject.AddComponent<UnityChunk>();
                    chunk.Parent = this;
                    chunk.Terra = terrain;
                    chunk.Position = new Pair(x, y);
                    chunk.Index = chunks.Count;
                    chunks.Add(chunk);
                }
            }
            return chunks;
        }

        public void RefreshChunks()
        {
            _refreshingChunks.AddRange(_chunks);
            var positions = new List<Pair>();
            CoreUtils.Foreach(new Pair(ViewDistance * 2 + 1,ViewDistance * 2 + 1), localPosition =>
            {
                var position = localPosition + new Pair(-ViewDistance, -ViewDistance) + CurrentChunkPosition;
                var current = _refreshingChunks.Find(x => x.Position == position);
                if (current != null)
                {
                    _refreshingChunks.Remove(current);
                }
                else
                {
                    positions.Add(position);
                }
            });
            for (int i = 0; i < positions.Count; i++)
            {
                _refreshingChunks[i].Position = positions[i];
                _refreshingChunks[i].Refresh();
            }
            _refreshingChunks.Clear();
        }
        public void OnTerracoreSyncronization(string data)
        {
            var syncData = JsonUtility.FromJson<TerrainSyncData>(data);
            _chunks[syncData.Index].OnTerracoreSyncronization(syncData.TreeData);
        }
    }
}