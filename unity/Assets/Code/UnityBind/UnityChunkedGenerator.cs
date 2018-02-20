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
    [RequireComponent (typeof (Cursor))]
    public class UnityChunkedGenerator : MonoBehaviour
    {
        private List<UnityChunk> _chunks;
        public TerrainSettings TerrainSettings;

        public Vector2 CurrentChunkPosition;

        public int ViewDistance;

        public CoreImpl Core;
        private List<UnityChunk> _refreshingChunks;
        
        [DllImport("__Internal")]
        private static extern void InitTerrainStorages(int amount);
        
        public void Refresh()
        {
            if (_chunks != null)
            {
                foreach (var chunk in _chunks)
                {
                    Destroy(chunk);
                }
            }

            var modifiers = Array.FindAll(
                gameObject.GetComponents<IModifier<CellImpl>>(),
                modifier => ((MonoBehaviour) modifier).enabled);
            var biomes = modifiers.OfType<Biome<CellImpl>>();

            foreach (var modifier in modifiers)
            {
                modifier.Start();
            }

            Core = new CoreImpl(CellInitializer,TerrainSettings.Resolution,
                modifiers);
            _chunks = CreateChunks(biomes);
            InitTerrainStorages(_chunks.Count);
            _refreshingChunks = new List<UnityChunk>();
            StartCoroutine(Create());
        }

        private CellImpl CellInitializer(Pair coords)
        {
            return new CellImpl(coords) {Core = Core};
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
                Refresh();
            }
        }

        private List<UnityChunk> CreateChunks(IEnumerable<Biome<CellImpl>> biomes)
        {
            var chunksCount = (ViewDistance * 2 + 1) * (ViewDistance * 2 + 1);
            var chunks = new List<UnityChunk>(chunksCount);

            for (var y = -ViewDistance; y <= ViewDistance; y++)
            {
                for (var x = -ViewDistance; x <= ViewDistance; x++)
                {
                    var terrain = TerrainSettings.CreateTerrain();
                    terrain.gameObject.transform.parent = transform;
                    foreach (var biome in biomes)
                    {
                        biome.ApplyPrototypes(terrain);
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
        public void OnTerracoreSyncronization(int index)
        {
            _chunks[index].OnTerracoreSyncronization();
        }
    }
}