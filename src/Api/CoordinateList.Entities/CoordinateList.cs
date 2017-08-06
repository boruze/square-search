using System.Collections.Generic;

namespace SquareSearch.Entities
{
    public class CoordinateList
    {
        public int Id { get; }
        public string Name { get; }
        public ISet<Coordinate> Coordinates { set;  get; }

        public CoordinateList(int id, string name)
        {
            Id = id;
            Name = name;
            Coordinates = new HashSet<Coordinate>();
        }

        public CoordinateList(int id, string name, ISet<Coordinate> coordinates)
        {
            Id = id;
            Name = name;
            Coordinates = coordinates;
        }
    }
}
