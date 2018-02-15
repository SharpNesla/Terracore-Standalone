using System;
using System.Collections.Generic;
using System.Threading;

namespace SimpleGenerator.Util
{
    public class ThreadPool
    {
        private readonly Thread[] _threads;
        private readonly Queue<AsyncTask> _tasks;
        public ThreadPool(int threadAmount)
        {
            _tasks = new Queue<AsyncTask>();
            _threads = new Thread[threadAmount];
            for (var i = 0; i < threadAmount; i++)
            {
                _threads[i] = new Thread(ThreadExecution);
            }
            foreach (var thread in _threads)
            {
                thread.Start();
            }
        }

        private void ThreadExecution()
        {
            while (true)
            {
                Thread.Sleep(40);
                try
                {
                    AsyncTask local = null;
                    lock (_tasks)
                    {
                        if (_tasks.Count > 0)
                        {
                            local = _tasks.Dequeue();
                            local.Executor = Thread.CurrentThread;
                        }
                    }
                    if (local != null)
                    {
                        local.AsyncAction(null);
                    }
                }
                catch (ThreadAbortException e)
                {
                    Thread.ResetAbort();
                }
            }
        }

        public void QueueTask(AsyncTask task)
        {
            lock (_tasks)
            {
                _tasks.Enqueue(task);
            }
        }
    }

}