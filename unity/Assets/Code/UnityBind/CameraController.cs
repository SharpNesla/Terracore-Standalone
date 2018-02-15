using UnityEngine;

namespace Code.UnityBind
{
    public class CameraController : MonoBehaviour
    {
        private Transform _cachedTransform;
        public float Coeff, Speed;
        private Rigidbody _physx;

        void Start()
        {
            _physx = gameObject.GetComponent<Rigidbody>();
            _cachedTransform = gameObject.GetComponent<Transform>();
        }

        void FixedUpdate()
        {
            var xRot = Input.GetAxis("Mouse X") * Coeff;
            var yRot = -Input.GetAxis("Mouse Y") * Coeff;
            this.transform.Rotate(yRot, 0, 0, Space.Self);
            this.transform.Rotate(0, xRot, 0, Space.World);
            var horiz = Input.GetAxis("Horizontal");
            var vertical = Input.GetAxis("Vertical");

            transform.position = _cachedTransform.localPosition + _cachedTransform.rotation * new Vector3(horiz, 0, vertical) * Speed;

            Speed = Input.GetKey(KeyCode.LeftShift) ? 3f : 1;
        }
    }
}