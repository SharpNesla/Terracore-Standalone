using System;
using System.Linq;
using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using SimpleGenerator.Modifiers.Biomes;
using UnityEngine;

namespace Code.Modifiers.Biomes
{
    [RequireComponent(typeof(UnityChunkedGenerator))]
    public class Grass : Biome<CellImpl>
    {
        public float TopBound, LowBound;
        public int GrassCount;
        public float MaxCellElevation;
        public TerrainTexture SplatTexture;
        public TerrainGrass GrassDetailLayer;
        private int _index, _detailIndex;
        public override void Callback(CellImpl current)
        {
            if (current.Height < TopBound && current.Height > LowBound &&current.Elevation < MaxCellElevation)
            {
                current.Biomes.Add(this);
            }
        }

        public override void Apply(CellImpl current, TerrainStorage storage)
        {
            storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y, 0] = 0f;
            storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y,
                SplatTexture.TerrainIndex] = 1f;
            storage.DetailLayers[_detailIndex]
                [current.LocalPosition.X, current.LocalPosition.Y] = GrassCount;
        }

        public override void ApplyPrototypes(Terrain terrain)
        {
           _detailIndex = GrassDetailLayer.ApplyGrass(terrain);
           SplatTexture.ApplyTexture(terrain);
        }

    }
}