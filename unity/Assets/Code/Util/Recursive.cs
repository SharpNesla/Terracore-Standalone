/*using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;


namespace C
{
    public class Recursive
    {
        public Dictionary<Point, Cell> Map;
        public int Max = 0;
        private Random _randomizer;
        public int _size;

        public const int Min = 0;
        public int Roughness =  6;

        public Recursive(int depth, Random randomizer)
        {
            _randomizer = randomizer;
            var size = _size = Size(depth);

            Map = new Dictionary<Point, Cell>
            {
                {Coord(0, 0), new Cell(randomizer.Next(0, 500), 0, 0)},
                {Coord(0, size - 1), new Cell(randomizer.Next(0, 500), 0, size - 1)},
                {Coord(size - 1, 0), new Cell(randomizer.Next(0, 500), size - 1, 0)},
                {Coord(size - 1, size - 1), new Cell(randomizer.Next(0, 500), size - 1, size - 1)}
            };
            foreach (var keyValuePair in Map)
            {
                Max = Math.Max(keyValuePair.Value.Height, Max);
            }
        }

        public Cell Height(int x, int y)
        {
            if (!(x >= 0 && x < _size && y >= 0 && y < _size))
            {
                return new Cell(Min);
            }
            if (!Map.ContainsKey(Coord(x, y)))
            {
                var sz = Stepsize(x, y);
                var value = IsSquare(x, y, sz)
                    ? SquareStep(x, y, sz)
                    : DiamondStep(x, y, sz);
                Map.Add(Coord(x, y), value);
                Max = Math.Max(value.Height, Max);
            }
            return Map[Coord(x, y)];
        }

        public static int Stepsize(int x, int y)
        {
            int stepsize = 1;
            while (((x & stepsize) == 0) && ((y & stepsize) == 0))
            {
                stepsize <<= 1;
            }
            return stepsize;
        }

        public Cell SquareStep(int x, int y, int stepsize)
        {
            return new Cell((Height(x - stepsize, y - stepsize).Height +
                             Height(x + stepsize, y - stepsize).Height +
                             Height(x - stepsize, y + stepsize).Height +
                             Height(x + stepsize, y + stepsize).Height) / 4 + Rand(stepsize), x, y);
        }

        public Cell DiamondStep(int x, int y, int stepsize)
        {
            return new Cell((Height(x - stepsize, y).Height +
                             Height(x + stepsize, y).Height +
                             Height(x, y - stepsize).Height +
                             Height(x, y + stepsize).Height) / 4 + Rand(stepsize), x, y);
        }

        public static Point Coord(int x, int y)
        {
            return new Point(x, y);
        }

        public bool IsSquare(int x, int y, int stepsize)
        {
            return (x & stepsize) != 0 && (y & stepsize) != 0;
        }

        public int Rand(int stepsize)
        {
            return _randomizer.Next(-Roughness * stepsize, Roughness * stepsize);
        }

        public static int Size(int depth)
        {
            return (int) (Math.Pow(2, depth) + 1);
        }
    }

    public struct Point
    {
        private int _x;
        private int _y;

        public Point(int x, int y)
        {
            _x = x;
            _y = y;
        }
    }
}
*/