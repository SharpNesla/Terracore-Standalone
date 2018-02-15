using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using SimpleGenerator.Modifiers.Biomes;
using UnityEngine;

namespace Code.Modifiers.Biomes
{
    [RequireComponent(typeof(UnityChunkedGenerator))]
    public class Cliff : Biome<CellImpl>
    {
        public TerrainTexture SplatTexture;
        public override void Callback(CellImpl current)
        {
            current.Biomes.Add(this);
        }

        public override void Apply(CellImpl current, TerrainStorage storage)
        {
            storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y, 0] = 1f;
        }
        public override void ApplyPrototypes(Terrain terrain)
        {
            SplatTexture.ApplyTexture(terrain);
        }
    }
}