using System.Collections.Generic;

namespace CoordinateList.Api.Entities
{
    public class CoordinateList
    {
        public int Id { get; }
        public string Name { get; }
        public ISet<Coordinate> Coordinates { get; }

        public CoordinateList(int id, string name, ISet<Coordinate> coordinates)
        {
            Id = id;
            Name = name;
            Coordinates = coordinates;
        }
    }
}
