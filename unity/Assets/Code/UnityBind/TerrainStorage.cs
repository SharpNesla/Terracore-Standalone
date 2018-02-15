using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.Assertions.Must;
using UnityStandardAssets.CinematicEffects;

namespace Assets.SimpleGenerator
{
    public class TerrainStorage
    {
        public float[,] Heights;
        public float[,,] SplatMap;
        public int [][,] DetailLayers;
        public List<TreeInstance> Instances;

        public List<SplatPrototype> Prototypes;

        private TerrainStorage(TerrainData data)
        {
            Heights = new float[data.heightmapWidth, data.heightmapHeight];
            SplatMap = new float
            [data.alphamapWidth,
                data.alphamapWidth,
                data.splatPrototypes.Length];
            DetailLayers = new int[data.detailPrototypes.Length][,];
            for (int i = 0; i < data.detailPrototypes.Length; i++)
            {
                DetailLayers[i] = new int[data.detailHeight, data.detailWidth];
            }

            Instances = new List<TreeInstance>(10000);
        }

        public static TerrainStorage FromTerrainData(TerrainData data)
        {
            return new TerrainStorage(data);
        }

        public void Reset(Pair size, Pair position)
        {
            Instances.Clear();
            for (var y = 0; y < size.X; y++)
            {
                for (var x = 0; x < size.X; x++)
                {
                    for (int i = 0; i < SplatMap.GetLength(2); i++)
                    {
                        SplatMap[x, y, i] = 0;
                    }
                }
            }
            for (int i = 0; i < DetailLayers.Length; i++)
            {
                for (var y = 0; y < size.X; y++)
                {
                    for (var x = 0; x < size.X; x++)
                    {
                        DetailLayers[i][x, y] = 0;
                    }
                }
            }
        }

        public void ApplyCells(CoreImpl core, Pair size, Pair position)
        {
            var cells = core.GetChunk(position);
            Reset(size, position);
            for (var y = 0; y < size.X; y++)
            {
                for (var x = 0; x < size.X; x++)
                {
                    var cell = cells[x + 1, y + 1];
                    Heights[x,y] = cells[x, y].Height;
                    for (int i = 0; i < SplatMap.GetLength(2); i++)
                    {
                        SplatMap[x, y, i] = 0;
                    }
                    for (var index = 0; index < cell.Biomes.Count; index++)
                    {
                        var biome = cell.Biomes[index];
                        biome.Apply(cell, this);
                    }
                }
            }

            for (var x = 0; x <= size.X; x++)
            {
                Heights[x, size.Y] = cells[x, size.Y].Height;
            }

            for (var y = 0; y < size.X; y++)
            {
                Heights[size.X, y] = cells[size.X, y].Height;
            }
        }
    }

    public static class TerrainStorageExtensions
    {
        public static void ApplyTerrainStorage(this TerrainData data, TerrainStorage storage)
        {
            data.SetHeights(0, 0, storage.Heights);
            data.SetAlphamaps(0, 0, storage.SplatMap);
            for (int i = 0; i < data.detailPrototypes.Length; i++)
            {
                data.SetDetailLayer(0, 0, i , storage.DetailLayers[i]);
            }
            data.treeInstances = storage.Instances.ToArray();
        }
    }
}