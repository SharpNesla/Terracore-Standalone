using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using SimpleGenerator.Util;
using UnityEngine;

namespace Assets.SimpleGenerator
{
    public class UnityChunk : MonoBehaviour
    {
        public Terrain Terra;
        public UnityChunkedGenerator Parent;
        public int Index;
        public Pair Position;
        private TerrainStorage _storage;

        [DllImport("__Internal")]
        private static extern void ExecuteTerracoreAsyncCode(int index ,int xPos, int yPos, int resolution);
        
        public void Start()
        {
            _storage = TerrainStorage.FromTerrainData(Terra.terrainData, Index);
           
            gameObject.GetComponent<TerrainCollider>().terrainData = Terra.terrainData;

        }

        public void Refresh()
        {
            var coordinates = new Pair(Position.X * Parent.Project.TerrainSettings.Resolution, Position.Y * Parent.Project.TerrainSettings.Resolution);
            ExecuteTerracoreAsyncCode(Index , coordinates.X, coordinates.Y, Parent.Project.TerrainSettings.Resolution);
        }

        public void OnTerracoreSyncronization(TreeInstance[] treeInstances)
        {
            //var coordinates = new Pair(Position.X * Parent.Project.TerrainSettings.Resolution, Position.Y * Parent.Project.TerrainSettings.Resolution);
            //var size = new Pair(Parent.Project.TerrainSettings.Resolution, Parent.Project.TerrainSettings.Resolution);
            //_storage.ApplyCells(Parent.Core, size, coordinates);
            _storage.Instances = treeInstances;
            Terra.terrainData.ApplyTerrainStorage(_storage);
            gameObject.transform.position = new Vector3(Position.X * Parent.Project.TerrainSettings.TerrainScale.x, 0,
                Position.Y * Parent.Project.TerrainSettings.TerrainScale.x);
        }
    }
}