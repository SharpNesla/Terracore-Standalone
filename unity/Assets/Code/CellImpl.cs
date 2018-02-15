using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using Code.Modifiers.Biomes;
using SimpleGenerator.Modifiers.Biomes;

namespace Assets.SimpleGenerator
{
    public class CellImpl : Cell
    {
        public List<Biome<CellImpl>> Biomes;
        public Pair LocalPosition;
        public CoreImpl Core;
        public CellImpl[,] LocalCache;

        public float Elevation
        {
            get
            {
                if (CheckLocalPosition())
                {
                    var top     = LocalCache[LocalPosition.X + 1, LocalPosition.Y + 2].Height;
                    var bot     = LocalCache[LocalPosition.X + 1, LocalPosition.Y].Height;
                    var left    = LocalCache[LocalPosition.X, LocalPosition.Y + 1].Height;
                    var right   = LocalCache[LocalPosition.X + 2, LocalPosition.Y + 1].Height;
                    var min = Math.Min(top, Math.Min(bot, Math.Min(right, left)));
                    var max = Math.Max(top, Math.Max(bot, Math.Max(right, left)));
                    return max - min;
                }
                return 0;
            }
        }

        public CellImpl(Pair coordinates, float height = 0) : base(coordinates, height)
        {
            Biomes = new List<Biome<CellImpl>>();
        }

        private bool CheckLocalPosition()
        {
            return LocalPosition.X >= 0 &&
                   LocalPosition.Y >= 0 &&
                   LocalPosition.X < Core.Resolution &&
                   LocalPosition.Y < Core.Resolution;
        }

    }
}