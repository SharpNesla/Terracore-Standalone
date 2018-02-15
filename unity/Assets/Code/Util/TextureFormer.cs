using System.IO;
using System.Linq;
using System.Net;
using Assets.SimpleGenerator;
using UnityEngine;

namespace Code.Util
{
    public static class TextureFormer
    {
        public static Texture2D BiomeTexture(this CoreImpl core, Pair position)
        {
            var cells = core.GetChunk(position * core.Resolution);
            var texture = new Texture2D(core.Resolution, core.Resolution);
            var colors = new Color[core.Resolution * core.Resolution];

            for (var y = 0; y < core.Resolution; y++)
            {
                for (var x = 0; x < core.Resolution; x++)
                {
                    var cell = cells[x + 1, y + 1];
                    colors[y * core.Resolution + x] = cell.Biomes.Last().TextureColor;
                }
            }

            texture.SetPixels(colors);
            texture.Apply();
            return texture;
        }

        public static Texture2D HeightTexture(this CoreImpl core, Pair position)
        {
            var cells = core.GetChunk(position * core.Resolution);
            var texture = new Texture2D(core.Resolution, core.Resolution);
            var colors = new Color[core.Resolution * core.Resolution];

            for (var y = 0; y < core.Resolution; y++)
            {
                for (var x = 0; x < core.Resolution; x++)
                {
                    var cell = cells[x + 1, y + 1];
                    colors[y * core.Resolution + x] = new Color(cell.Height, cell.Height, cell.Height);
                }
            }

            texture.SetPixels(colors);
            texture.Apply();
            return texture;
        }
    }
}