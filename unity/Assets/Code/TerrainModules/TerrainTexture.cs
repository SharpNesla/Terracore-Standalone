using System;
using System.Runtime.Serialization;
using UnityEngine;

namespace Assets.SimpleGenerator.TerrainModules
{
    [Serializable]
    public class TerrainTexture
    {
        public Texture2D Albedo;
        public string AlbedoPath;
        public Texture2D NormalMap;
        public string NormalMapPath;
        [Range(0, 1)] public float Metallic;
        [Range(0, 1)] public float Smoothness;
        public Color Specular;
        public Vector2 Offset, Size;
        [HideInInspector] public int TerrainIndex;

        
        
        public void DownloadTextures()
        {
            if (AlbedoPath != "")
            {
                WWW a = new WWW("file://" + AlbedoPath);
                Debug.Log(AlbedoPath);
                Albedo = a.texture;
            }

            if (NormalMapPath != "")
            {
                Texture2D source = new WWW("file://" + NormalMapPath).texture;
                Texture2D normalTexture = new Texture2D(source.width, source.height, TextureFormat.ARGB32, true);
                Color theColour = new Color();
                for (int x = 0; x < source.width; x++)
                {
                    for (int y = 0; y < source.height; y++)
                    {
                        theColour.r = source.GetPixel(x, y).b / 2 + 0.5f;
                        theColour.g = source.GetPixel(x, y).g / 2 + 0.5f;
                        theColour.b = source.GetPixel(x, y).r;
                        theColour.a = source.GetPixel(x, y).r;
                        normalTexture.SetPixel(x, y, theColour);
                    }
                }
                normalTexture.Apply();
                NormalMap = normalTexture;
            }
        }

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
            Array.Resize(ref splatprotos, splatprotos.Length + 1);
            splatprotos[splatprotos.Length - 1] = ToSplatPrototype();
            terrain.terrainData.splatPrototypes = splatprotos;

            this.TerrainIndex = splatprotos.Length - 1;
        }
    }
}