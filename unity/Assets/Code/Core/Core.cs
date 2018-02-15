using System;
using System.Collections.Generic;
using System.Xml.XPath;
using Code.Core;

namespace Assets.SimpleGenerator
{
    public class Core<T> where T : Cell
    {
        protected readonly Func<Pair,T> CellInitializer;
        protected readonly IModifier<T>[] Modifiers;

        public Core(Func<Pair,T> cellInitializer ,params IModifier<T>[] modifiers)
        {
            CellInitializer = cellInitializer;
            Modifiers = modifiers;
        }

        public T GetCell(Pair coordinates)
        {
            var i = ApplyModifiers(CellInitializer(coordinates));
            return i;
        }

        protected T ApplyModifiers(T cell)
        {
            for (var index = 0; index < Modifiers.Length; index++)
            {
                Modifiers[index].Callback(cell);
            }
            return cell;
        }
        public virtual T[,] GetRect(Pair size, Pair coordinate)
        {
            var i = new T[size.X, size.Y];
            return i.Foreach(size,coord => i[coord.X, coord.Y] =
                GetCell(coord + new Pair(coordinate.Y, coordinate.X)));
        }
    }
}