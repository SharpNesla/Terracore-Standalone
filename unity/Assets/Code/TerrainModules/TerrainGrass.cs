using System;
using UnityEngine;

namespace Assets.SimpleGenerator.TerrainModules
{
    [Serializable]
    public class TerrainGrass
    {
        public Texture2D PrototypeTexture;
        public Color DryColor, HealthyColor;

        public float MinimalWidth, MinimalHeight, MaximalWidth, MaximalHeight;

        public DetailRenderMode RenderMode;
        public DetailPrototype ToDetailPrototype()
        {
            var i = new DetailPrototype
            {
                prototypeTexture = PrototypeTexture,
                dryColor = DryColor,
                healthyColor = HealthyColor,
                maxHeight = MaximalHeight,
                maxWidth = MaximalWidth,
                minHeight = MinimalHeight,
                minWidth = MinimalWidth,
                renderMode = RenderMode
            };
            return i;
        }

        public int ApplyGrass(Terrain terrain)
        {
            var splatprotos = terrain.terrainData.detailPrototypes;
            Array.Resize(ref splatprotos, splatprotos.Length+1);
            splatprotos[splatprotos.Length - 1] = ToDetailPrototype();
            terrain.terrainData.detailPrototypes = splatprotos;
            return splatprotos.Length - 1;
        }
    }
}