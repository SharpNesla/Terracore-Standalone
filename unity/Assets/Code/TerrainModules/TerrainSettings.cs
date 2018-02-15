using System;
using UnityEngine;
using UnityEngine.Rendering;
using Object = UnityEngine.Object;

namespace Assets.SimpleGenerator.TerrainModules
{
    [Serializable]
    public class TerrainSettings
    {
        [Header("Rendering")]
        public bool Draw;
        [Range(0,200)]
        public float PixelError;
        [Range(0,2000)]
        public float FirstpassMaterialDistance;
        public bool CastShadows;
        public Terrain.MaterialType MaterialType;
        [HideInInspector] public bool IsHiddenMaterialProp;
        public Material Material;
        public ReflectionProbeUsage ReflectionProbeUsage;
        public float Thickness;
        [Header("Tree & Detail")]
        public bool DrawTrees;

        public bool BakeLightProbesForTrees;
        [Range(0,250)]
        public float DetailDistance;
        public float DetailDensity;
        public float TreeDistance;
        public float BillboardStart;
        public float FadeLength;
        public int MaxTreeMeshes;
        [Header("Grass and Wind")] public float Speed;
        public float Size;
        public float Bending;
        public Color GrassTint;
        [Header("Dimensions")]
        public Vector3 TerrainScale;
        public int Resolution, DetailResolutionPerPatch;

        public Terrain CreateTerrain()
        {
            var data = CreateTerrainData();
            var terrain = Terrain.CreateTerrainGameObject(data).GetComponent<Terrain>();
            terrain.basemapDistance = FirstpassMaterialDistance;
            terrain.materialType = Terrain.MaterialType.Custom;
            terrain.materialTemplate = Material;
            terrain.castShadows = CastShadows;
            terrain.heightmapPixelError = PixelError;
            terrain.detailObjectDensity = DetailDensity;
            terrain.detailObjectDistance = DetailDistance;
            terrain.reflectionProbeUsage = ReflectionProbeUsage;
            terrain.treeBillboardDistance = BillboardStart;
            terrain.treeDistance = TreeDistance;
            terrain.treeMaximumFullLODCount = MaxTreeMeshes;
            terrain.materialType = MaterialType;
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
                wavingGrassTint = GrassTint
            };
            data.SetDetailResolution(Resolution, DetailResolutionPerPatch);
            return data;
        }
    }
}