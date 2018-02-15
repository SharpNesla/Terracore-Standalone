using System;
using System.Collections.Generic;
using System.Security.Policy;
using Code.Core;

namespace Assets.SimpleGenerator
{
    public class CoreImpl : Core<CellImpl>
    {
        public readonly int Resolution;
        public CoreImpl(Func<Pair, CellImpl> cellInitializer, int resolution, params IModifier<CellImpl>[] modifiers) : base(cellInitializer, modifiers)
        {
            Resolution = resolution;
        }

        public override CellImpl[,] GetRect(Pair size, Pair coordinate)
        {
            var i = new CellImpl[size.X, size.Y];
            for (var y = 0; y < size.Y; y++)
            {
                for (var x = 0; x < size.X; x++)
                {
                    i[x, y] = CellInitializer(new Pair(coordinate.Y + x, coordinate.X + y));
                }
            }
            return i;
        }

        public CellImpl[,] GetChunk(Pair position)
        {
            var size = new Pair(Resolution + 2, Resolution + 2);
            var i = GetRect(size, position + new Pair(-1,-1));

            for (var y = 0; y < Resolution + 2; y++)
            {
                for (var x = 0; x < Resolution + 2; x++)
                {
                    i[x,y].LocalCache = i;
                    i[x,y].LocalPosition = new Pair(-1 + x, -1 + y);
                }
            }

            for (var j = 0; j < Modifiers.Length; j++)
            {
                for (var y = 0; y < Resolution + 2; y++)
                {
                    for (var x = 0; x < Resolution + 2; x++)
                    {
                        Modifiers[j].Callback(i[x,y]);
                    }
                }
            }
            return i;
        }
    }
}