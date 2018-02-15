using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using UnityEngine;
using UnityEngine.Assertions.Must;

namespace Code.Modifiers.Biomes
{
    [RequireComponent(typeof(UnityChunkedGenerator))]
    public class Ocean : Biome<CellImpl>
    {
        public int GrassCount;
        public TerrainTexture SplatTexture;
        public override void Callback(CellImpl current)
        {
            if (current.Height < 0.3f)
            {
                current.Biomes.Clear();
                current.Biomes.Add(this);
            }
        }

        public override void Apply(CellImpl current, TerrainStorage storage)
        {
            storage.SplatMap[current.LocalPosition.X, current.LocalPosition.Y,
                SplatTexture.TerrainIndex] = 1f;
        }

        public override void ApplyPrototypes(Terrain terrain)
        {
            SplatTexture.ApplyTexture(terrain);
        }

    }
}