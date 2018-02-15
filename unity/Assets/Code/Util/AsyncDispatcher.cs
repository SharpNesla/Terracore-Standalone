using System;
using System.Collections.Generic;
using Code.Core;
using Code.Util;
using SimpleGenerator.Util;
using UnityEngine;
using ThreadPool = SimpleGenerator.Util.ThreadPool;

namespace Assets.SimpleGenerator
{
    public class AsyncDispatcher : MonoBehaviour, IInterfaceElement
    {

        private static List<AsyncTask> _a;
        private static ThreadPool _pool;
        private static bool _useDotNetThreadPool;
        public bool UseDotNetThreadPool;
        public int ThreadCount;
        private void Start()
        {
            Refresh();
        }

        private void Update()
        {
            for (var i = 0; i < _a.Count; i++)
            {
                var task = _a[i];
                if (task.State == TaskState.Ready)
                {
                    task.SyncAction();
                    _a.Remove(task);
                }
            }
        }

        public static void Abort(AsyncTask asyncTask)
        {
            if (asyncTask != null && asyncTask.State == TaskState.Handling)
            {
                asyncTask.Executor.Abort();
                asyncTask.State = TaskState.Prepared;
                _a.Remove(asyncTask);
            }

        }

        public static void Queue(AsyncTask asyncTask)
        {
            if (asyncTask != null && asyncTask.State == TaskState.Prepared)
            {
                _a.Add(asyncTask);
                if (_useDotNetThreadPool)
                {
                    System.Threading.ThreadPool.QueueUserWorkItem(asyncTask.AsyncAction);
                }
                else
                {
                    _pool.QueueTask(asyncTask);
                }
            }
        }

        public void Refresh()
        {
            _a = new List<AsyncTask>();
            _useDotNetThreadPool = UseDotNetThreadPool;
            if (!UseDotNetThreadPool)
            {
                _pool = new ThreadPool(1);
            }
            else
            {
                System.Threading.ThreadPool.SetMaxThreads(Environment.ProcessorCount, Environment.ProcessorCount);
            }
        }
    }
}