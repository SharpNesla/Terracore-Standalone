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
        public AsyncTask _refreshTask;
        private TerrainStorage _storage;

        [DllImport("__Internal")]
        private static extern void ExecuteTerracoreAsyncCode(int index ,int xPos, int yPos, int resolution);
        
        public void Start()
        {
            _storage = TerrainStorage.FromTerrainData(Terra.terrainData, Index);
           
            gameObject.GetComponent<TerrainCollider>().terrainData = Terra.terrainData;

            _refreshTask = new AsyncTask(() => { }, () => { });
        }

        public void Refresh()
        {
            var coordinates = new Pair(Position.X * Parent.TerrainSettings.Resolution, Position.Y * Parent.TerrainSettings.Resolution);
            ExecuteTerracoreAsyncCode(Index , coordinates.X, coordinates.Y, Parent.TerrainSettings.Resolution);
        }

        public void OnTerracoreSyncronization(string treePositions)
        {
            //var coordinates = new Pair(Position.X * Parent.TerrainSettings.Resolution, Position.Y * Parent.TerrainSettings.Resolution);
            //var size = new Pair(Parent.TerrainSettings.Resolution, Parent.TerrainSettings.Resolution);
            //_storage.ApplyCells(Parent.Core, size, coordinates);
            Terra.terrainData.ApplyTerrainStorage(_storage);
            gameObject.transform.position = new Vector3(Position.X * Parent.TerrainSettings.TerrainScale.x, 0,
                Position.Y * Parent.TerrainSettings.TerrainScale.x);
        }
    }
}