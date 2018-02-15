using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using UnityEngine;

namespace Code.Modifiers.Biomes
{
    [RequireComponent(typeof(UnityChunkedGenerator))]
    public class RockSpawner : Biome<CellImpl>
    {
        [Range(25, 10000)] public int RockChance;
        public TerrainObject Rock;

        private int _index;

        public override void Callback(CellImpl current)
        {
            var value = current.Position.RandomFromPosition(0, RockChance, 54);
            if (value == 0)
            {
                current.Biomes.Add(this);
            }
        }

        public override void Apply(CellImpl current, TerrainStorage storage)
        {
            storage.Instances.Add(MakeRock(current, current.Core.Resolution));
        }

        private TreeInstance MakeRock(CellImpl current, int localScale)
        {
            TreeInstance instance = new TreeInstance
            {
                prototypeIndex = Rock.TerrainIndex,
                rotation = current.Position.RandomFromPosition(0, 359,54),
                heightScale = 1f,
                position = new Vector3 ((float) current.LocalPosition.Y / localScale, current.Height - 0.0005f,
                    (float) current.LocalPosition.X / localScale)
            };
            instance.widthScale = instance.heightScale;
            return instance;
        }
        public override void ApplyPrototypes(Terrain terrain)
        {
            Rock.ApplyTree(terrain);
        }
    }
}