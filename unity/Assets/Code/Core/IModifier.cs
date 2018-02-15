using Assets.SimpleGenerator;
using Code.Util;

namespace Code.Core
{
    public interface IModifier<T> : IInterfaceElement where T : Cell
    {
        void Callback(T current);
        void Start();
    }
}