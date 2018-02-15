using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using UnityEngine;

namespace Code.Modifiers.Biomes
{
    [RequireComponent(typeof(UnityChunkedGenerator))]
    public class AlpSnow : Biome<CellImpl>
    {
        public float TopBound, LowBound;
        public float MaxCellElevation;
        public TerrainTexture SplatTexture;
        public override void Callback(CellImpl current)
        {
            if (current.Height < TopBound && current.Height > LowBound &&current.Elevation < MaxCellElevation)
            {
                current.Biomes.Add(this);
            }
        }

        public override void Apply(CellImpl current, TerrainStorage storage)
        {
            storage.SplatMap[current.LocalPosition.X,
                current.LocalPosition.Y, 0] = 0f;

            storage.SplatMap[current.LocalPosition.X,
                current.LocalPosition.Y,
                SplatTexture.TerrainIndex] = current.Height + 0.1f;
        }
        public override void ApplyPrototypes(Terrain terrain)
        {
            SplatTexture.ApplyTexture(terrain);
        }
    }
}