namespace Assets.SimpleGenerator
{
    public abstract class Cell
    {
        public float Height;
        public readonly Pair Position;

        protected Cell(Pair coordinates, float height = 0)
        {
            Position = coordinates;
            Height = height;
        }
    }
}