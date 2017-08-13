using System.Collections.Generic;

namespace SquareSearch.Api.DtoModels
{
    public class CoordinateList
    {
        public int Id { get; }
        public string Name { get; }
        public IList<Coordinate> Coordinates { get; }

        public CoordinateList(int id, string name, IList<Coordinate> coordinates)
        {
            Id = id;
            Name = name;
            Coordinates = coordinates;
        }
    }
}