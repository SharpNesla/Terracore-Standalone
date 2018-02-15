using System;
using SimpleGenerator.Util;
using UnityEngine;

namespace Assets.SimpleGenerator
{
    public class UnityChunk : MonoBehaviour
    {
        public Terrain Terra;
        public UnityChunkedGenerator Parent;

        public Pair Position;
        public AsyncTask _refreshTask;
        private TerrainStorage _storage;


        public void Start()
        {
            _storage = TerrainStorage.FromTerrainData(Terra.terrainData);

            gameObject.GetComponent<TerrainCollider>().terrainData = Terra.terrainData;

            _refreshTask = new AsyncTask(()=> {},()=>{});
        }

        public void Refresh()
        {
            var chunkTime = DateTime.UtcNow;
            /*_refreshTask = new AsyncTask(() =>
                {
                    
                },
                () =>
                {
                    
                }
            );*/
            
            chunkTime = DateTime.Now;
            var coordinates = new Pair(Position.X * Parent.TerrainSettings.Resolution, Position.Y * Parent.TerrainSettings.Resolution);
            var size = new Pair(Parent.TerrainSettings.Resolution, Parent.TerrainSettings.Resolution);
            _storage.ApplyCells(Parent.Core, size, coordinates);
            
            Terra.terrainData.ApplyTerrainStorage(_storage);

            gameObject.transform.position = new Vector3(Position.X * Parent.TerrainSettings.TerrainScale.x, 0,
                Position.Y * Parent.TerrainSettings.TerrainScale.x);
            Debug.LogFormat("Refreshing chunk -> x:{0}, y:{1}, <>:{2}", Position.X, Position.Y, DateTime.Now - chunkTime);
            
            //AsyncDispatcher.Queue(_refreshTask);
        }
    }
}