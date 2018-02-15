using System;
using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using Code.Core;
using UnityEngine;

namespace Code.Modifiers.Biomes
{

    public abstract class Biome<T> : MonoBehaviour, IModifier<T> where T : Cell
    {
        public Color TextureColor;
        public abstract void Apply(T current,TerrainStorage storage);
        public abstract void Callback(T current);
        public virtual void Start() {}
        public virtual void ApplyPrototypes(Terrain terrain) {}
        public void Refresh() {}
    }
}