namespace CooList.WebApi.DataAccess
{
    public struct PointCoordinate
    {
        public int PointX { get; }
        public int PointY { get; }

        public PointCoordinate(int pointX, int pointY)
        {
            PointX = pointX;
            PointY = pointY;
        }
    }
}
