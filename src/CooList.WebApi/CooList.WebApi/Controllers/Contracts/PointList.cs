using System.Collections.Generic;

namespace CooList.WebApi.Controllers.Contracts
{
    public struct Coordinate
    {
        public int PointX { get; }
        public int PointY { get; }

        public Coordinate(int pointX, int pointY)
        {
            PointX = pointX;
            PointY = pointY;
        }
    }

    public class PointListDetailsWithId : PointListDetails
    {
        public int Id { get; }

        public PointListDetailsWithId(int id, string name, IEnumerable<Coordinate> points)
            : base (name, points)
        {
            Id = id;
        }
    }

    public class PointListDetails
    {
        public string Name { get; }
        public IEnumerable<Coordinate> Points { get; }

        public PointListDetails(string name, IEnumerable<Coordinate> points)
        {
            Name = name;
            Points = points;
        }
    }

    public class PointListBase
    {
        public int Id { get; }
        public string Name { get; }

        public PointListBase(int id, string name)
        {
            Name = name;
            Id = id;
        }
    }
}
