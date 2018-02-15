using System;
using System.Security.Cryptography.X509Certificates;

namespace Assets.SimpleGenerator
{
    public static class CoreUtils
    {
        public static T[,] Foreach<T>(this T[,] massive, Action<Pair, T> callback)
        {
            for (var y = 0; y < massive.GetLength(0); y++)
            {
                for (var x = 0; x < massive.GetLength(0); x++)
                {
                    callback(new Pair(x,y), massive[x,y]);
                }
            }
            return massive;
        }
        public static T[,] Foreach<T>(this T[,] massive,Pair size, Action<Pair> callback)
        {
            for (var y = 0; y < size.Y; y++)
            {
                for (var x = 0; x < size.X; x++)
                {
                    callback(new Pair(x,y));
                }
            }
            return massive;
        }
        public static void Foreach(Pair size, Action<Pair> callback)
        {
            for (var y = 0; y < size.Y; y++)
            {
                for (var x = 0; x < size.X; x++)
                {
                    callback(new Pair(x,y));
                }
            }
        }

        public static T[,] Foreach<T>(this T[,] massive, Action<Pair> callback)
        {
            for (var y = 0; y < massive.GetLength(1); y++)
            {
                for (var x = 0; x < massive.GetLength(0); x++)
                {
                    callback(new Pair(x,y));
                }
            }
            return massive;
        }
        public static int RandomFromPosition(this Pair coordinates, int min, int max, int seed)
        {
            long s = seed * 1972854929;
            s ^= (coordinates.X * 2971902361) ^ (coordinates.Y * 3572953751);
            s = 0x6C078965 * s;

            s ^= s >> 11;
            s ^= (s << 7) & 0x9D2C5680;
            s ^= (s << 15) & 0xEFC60000;
            s ^= s >> 18;

            return (int) ((s & 0x7FFFFFFF) * 4.656612875245796924105750827168e-10 * 1000000000 * 2) % (max - min) + min;
        }
        public static int RandomFromPosition(int min, int max, int seed, Pair coordinates)
        {
            long s = seed * 1972854929;
            s ^= (coordinates.X * 2971902361) ^ (coordinates.Y * 3572953751);
            s = 0x6C078965 * s;// & 0xFFFFFFFF;

            s ^= s >> 11;
            s ^= (s << 7) & 0x9D2C5680;
            s ^= (s << 15) & 0xEFC60000;
            s ^= s >> 18;

            return (int) ((s & 0x7FFFFFFF) * 4.656612875245796924105750827168e-10 * 1000000000 * 2) % (max - min) + min;
        }
    }

}