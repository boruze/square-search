using System.Collections.Generic;

namespace CooList.WebApi.DataAccess
{
    public class PointList
    {
        public int Id { get; }
        public string Name { get; }
        public ISet<PointCoordinate> Points { get; set; }

        public PointList(int id, string name, ISet<PointCoordinate> points)
        {
            Id = id;
            Name = name;
            Points = points;
        }

        public PointList(int id, string name) : this(id, name, new HashSet<PointCoordinate>()) { }
        public PointList(string name): this(0, name) { }
    }
}
