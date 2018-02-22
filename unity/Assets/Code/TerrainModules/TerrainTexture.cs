using System;
using System.Runtime.Serialization;
using UnityEngine;

namespace Assets.SimpleGenerator.TerrainModules
{
    [Serializable]
    public class TerrainTexture
    {
        public Texture2D Albedo;
        public Texture2D NormalMap;
        [Range(0,1)]
        public float Metallic;
        [Range(0,1)]
        public float Smoothness;
        public Color Specular;
        public Vector2 Offset, Size;
        [HideInInspector]
        public int TerrainIndex;
        
        public SplatPrototype ToSplatPrototype()
        {
            var spl = new SplatPrototype
            {
                texture = Albedo,
                normalMap = NormalMap,
                metallic = Metallic,
                smoothness = Smoothness,
                specular = Specular,
                tileOffset = Offset,
                tileSize = Size
            };
            return spl;
        }

        public void ApplyTexture(Terrain terrain)
        {
            var splatprotos = terrain.terrainData.splatPrototypes;
            Array.Resize(ref splatprotos, splatprotos.Length+1);
            splatprotos[splatprotos.Length - 1] = ToSplatPrototype();
            terrain.terrainData.splatPrototypes = splatprotos;

            this.TerrainIndex = splatprotos.Length - 1;
        }
    }
}