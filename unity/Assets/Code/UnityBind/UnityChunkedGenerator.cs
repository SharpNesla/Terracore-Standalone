using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using Assets.SimpleGenerator.TerrainModules;
using Code.Core;
using Code.Modifiers.Biomes;
using Code.Util;
using JetBrains.Annotations;
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
        public TerrainObject[] TerrainObjects;
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
    public struct TerrainSyncData
    {
        public int Index;
        public TreeInstanc[] Instances;

        public TreeInstance[] TreeInstances
        {
            get
            {
                return Instances.Select(x => new TreeInstance
                    {
                        position = x.Position,
                        widthScale = x.Scale,
                        heightScale = x.Scale,
                        rotation = x.Rotation,
                        prototypeIndex = x.PrototypeIndex
                    })
                    .ToArray();
            }
        }
    }

    [Serializable]
    public struct TreeInstanc
    {
        public Vector3 Position;
        public int Scale;
        public float Rotation;
        public int PrototypeIndex;
    }

    [RequireComponent(typeof(Cursor))]
    public class UnityChunkedGenerator : MonoBehaviour
    {
        public Project PrebuiltProject;
        public Project Project;
        public List<TerrainObject> TerrainObjects;
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
            CoreUtils.Foreach(new Pair(ViewDistance * 2 + 1, ViewDistance * 2 + 1), position =>
            {
                var current = _chunks[position.Y * (ViewDistance * 2 + 1) + position.X];
                current.Position = position + new Pair(-ViewDistance, -ViewDistance) + CurrentChunkPosition;
                current.Refresh();
            });
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

                    foreach (var splat in PrebuiltProject.TerrainSplatMaterials)
                    {
                        splat.ApplyTexture(terrain);
                    }

                    foreach (var grass in PrebuiltProject.TerrainGrass)
                    {
                        grass.ApplyGrass(terrain);
                    }

                    foreach (var terrainObject in PrebuiltProject.TerrainObjects)
                    {
                        terrainObject.ApplyTree(terrain);
                    }

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
            CoreUtils.Foreach(new Pair(ViewDistance * 2 + 1, ViewDistance * 2 + 1), localPosition =>
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
            _chunks[syncData.Index].OnTerracoreSyncronization(syncData.TreeInstances);
        }
    }
}