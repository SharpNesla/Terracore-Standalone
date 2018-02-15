using System;
using UnityEngine;

namespace Assets.SimpleGenerator.TerrainModules
{
    [Serializable]
    public class TerrainObject
    {
        public GameObject Prefab;
        public float BendFactor;
        public int MinimalTreeScale;
        public int MaximalTreeScale;

        [HideInInspector]
        public int TerrainIndex;

        public TreePrototype ToTreePrototype()
        {
            var i = new TreePrototype
            {
                prefab = Prefab,
                bendFactor = BendFactor
            };
            return i;
        }

        public void ApplyTree(Terrain terrain)
        {
            var treeprotos = terrain.terrainData.treePrototypes;
            Array.Resize(ref treeprotos, treeprotos.Length+1);
            treeprotos[treeprotos.Length - 1] = ToTreePrototype();
            terrain.terrainData.treePrototypes = treeprotos;

            this.TerrainIndex = treeprotos.Length - 1;
        }

    }
}