using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using Code.Modifiers.Biomes;
using UnityEngine;

namespace SimpleGenerator.Modifiers.Biomes
{
    [RequireComponent(typeof(UnityChunkedGenerator))]
    public class Beach : Biome<CellImpl>
    {
        public TerrainTexture SplatTexture;
        public override void Callback(CellImpl current)
        {
            if (current.Height < 0.301f)
            {
                current.Biomes.Clear();
                current.Biomes.Add(this);
            }
        }

        public override void Apply(CellImpl current, TerrainStorage storage)
        {
            storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y, 0] = 0f;
            storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y,
                SplatTexture.TerrainIndex] = 1f;
        }

        public override void ApplyPrototypes(Terrain terrain)
        {
            SplatTexture.ApplyTexture(terrain);
        }

    }
}