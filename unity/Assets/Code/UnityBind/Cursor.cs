using System;
using Assets.SimpleGenerator;
using Assets.SimpleGenerator.TerrainModules;
using UnityEngine;
using UnityEngine.UI;

namespace Code.UnityBind
{
    public class Cursor : MonoBehaviour
    {
        private UnityChunkedGenerator _generator;
        private Transform _vector3;
        private Vector2 _generatorCurrentChunkPosition;
        private Pair _position;
        public Transform CameraTransform;

        private void Start()
        {
            _generator = gameObject.GetComponent<UnityChunkedGenerator>();
            _vector3 = FindObjectOfType<Camera>().transform;
        }

        private void Update()
        {
            var currentPosition = _vector3.position / _generator.TerrainSettings.TerrainScale.x;
            _generatorCurrentChunkPosition = new Vector2((float) Math.Floor(currentPosition.x),
                (float) Math.Floor(currentPosition.z));
            //DebugPositionText.text = string.Format("Current position -> x:{0}, y:{1}",
            //    _generatorCurrentChunkPosition.x,
            //    _generatorCurrentChunkPosition.y);
            if (_generator.CurrentChunkPosition != _generatorCurrentChunkPosition)
            {
                _generator.CurrentChunkPosition = _generatorCurrentChunkPosition;
                _generator.RefreshChunks();
            }
            _generator.CurrentChunkPosition = _generatorCurrentChunkPosition;

        }

        public void SetX(string str)
        {
            int.TryParse(str, out _position.X);
        }

        public void SetY(string str)
        {
            int.TryParse(str, out _position.Y);
        }
    }
}