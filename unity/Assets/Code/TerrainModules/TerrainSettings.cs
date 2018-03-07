using System;
using UnityEngine;
using UnityEngine.Rendering;
using Object = UnityEngine.Object;

namespace Assets.SimpleGenerator.TerrainModules
{
    [Serializable]
    public class TerrainSettings
    {

        public Vector3 TerrainScale
        {
            get
            {
                return new Vector3(Resolution * 4, Resolution * 4, Resolution * 4);
            }
        }

        [Header("Dimensions")] public int Resolution;

        public Terrain CreateTerrain()
        {
            var data = CreateTerrainData();
            var terrain = Terrain.CreateTerrainGameObject(data).GetComponent<Terrain>();
            terrain.basemapDistance = 2000;
            terrain.materialType = Terrain.MaterialType.BuiltInStandard;
            terrain.castShadows = true;
            terrain.heightmapPixelError = 3;
            terrain.detailObjectDensity = 1;
            terrain.detailObjectDistance = 50;
            terrain.reflectionProbeUsage = ReflectionProbeUsage.Off;
            terrain.treeBillboardDistance = 500;
            terrain.treeDistance = 2000;
            terrain.treeMaximumFullLODCount = 50;
            return terrain;
        }

        private TerrainData CreateTerrainData()
        {
            var data = new TerrainData
            {
                heightmapResolution = Resolution + 1,
                alphamapResolution = Resolution,
                baseMapResolution = Resolution,
                splatPrototypes = new SplatPrototype[0],
                detailPrototypes = new DetailPrototype[0],
                treePrototypes = new TreePrototype[0],
                size = TerrainScale,
                wavingGrassTint = new Color(0.79f, 0.79f, 0.79f)
            };
            data.SetDetailResolution(Resolution, 8);
            return data;
        }
    }
}