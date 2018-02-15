using System;
using System.Runtime.Serialization;
using UnityEngine;

namespace Assets.SimpleGenerator
{
    [Serializable]
    public struct Pair
    {
        public int X, Y;
        public Pair(int x, int y)
        {
            X = x;
            Y = y;
        }

        public static implicit operator Pair(Vector2 vector)
        {
            return new Pair((int)vector.x,(int) vector.y);
        }

        public static Pair operator +(Pair first, Pair second)
        {
            return new Pair(first.X + second.X, first.Y + second.Y);
        }
        public static Pair operator *(Pair first, int second)
        {
            return new Pair(first.X * second, first.Y * second);
        }
        public static bool operator !=(Pair first, Pair second)
        {
            return !(first == second);
        }

        public static bool operator ==(Pair first, Pair second)
        {
            return first.X == second.X && first.Y == second.Y;
        }
    }
}