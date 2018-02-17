using System;
using System.Threading;
using Code.Core;
using LibNoise.Generator;
using LibNoise.Operator;
using UnityEngine;

namespace Assets.SimpleGenerator
{
    public class BillowNoiseModifier : MonoBehaviour, IModifier<CellImpl>
    {
        public float Frequency;
        public int Octaves;
        private Billow _noiseGenerator;
        private Perlin _hillModulator, _continentModulator;
        public float HillModulatorFrequency;
        private Const WaterLevelOSC;
        private Select _selector;
        public float maximumHeight;
        public float minimumHeight;
        public float hillHeight;
        public float HillFallOff;
        public void Start()
        {
            Refresh();
        }

        public void Callback(CellImpl current)
        {
            var x = current.Position.X;
            var y = current.Position.Y;
            var f =  Mathf.Abs((float) (_selector.GetValue(x,0,y) /1.4f + 0.28f));


            f = f * f / 2.5f + 0.299f;


            current.Height = f;
            maximumHeight = Mathf.Max(maximumHeight, current.Height);
            minimumHeight = Mathf.Min(minimumHeight, current.Height);
        }

        public void Refresh()
        {
            _noiseGenerator = new Billow{Frequency = Frequency,OctaveCount = Octaves, Seed = 34};
            _hillModulator = new Perlin{Frequency = HillModulatorFrequency, OctaveCount = 12};
            WaterLevelOSC = new Const(hillHeight);
            _selector = new Select(WaterLevelOSC, _noiseGenerator, _hillModulator) {FallOff = HillFallOff};
        }
    }
}