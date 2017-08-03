using System;
using System.Collections.Generic;

namespace CoordinateList.Api.DtoModels
{
    public class CoordinateBase
    {
        public int PointX { get; }
        public int PointY { get; }

        public CoordinateBase(int pointX, int pointY)
        {
            PointX = pointX;
            PointY = pointY;
        }
    }

    public class CoordinateEqualityComparer : IEqualityComparer<CoordinateBase>
    {
        public bool Equals(CoordinateBase x, CoordinateBase y)
        {
            return x.PointX == y.PointX && x.PointY == y.PointY;
        }

        public int GetHashCode(CoordinateBase obj)
        {
            return new { obj.PointY, obj.PointX }.GetHashCode();
        }
    }
}
