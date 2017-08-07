using System;
using System.Collections.Generic;

namespace SquareSearch.Api.DtoModels
{
    public class Coordinate
    {
        public int PointX { get; }
        public int PointY { get; }

        public Coordinate(int pointX, int pointY)
        {
            PointX = pointX;
            PointY = pointY;
        }
    }

    public class CoordinateEqualityComparer : IEqualityComparer<Coordinate>
    {
        public bool Equals(Coordinate x, Coordinate y)
        {
            return x.PointX == y.PointX && x.PointY == y.PointY;
        }

        public int GetHashCode(Coordinate obj)
        {
            return new { obj.PointY, obj.PointX }.GetHashCode();
        }
    }
}
