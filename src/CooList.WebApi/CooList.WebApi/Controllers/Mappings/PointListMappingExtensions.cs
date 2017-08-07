using CooList.WebApi.Controllers.Contracts;
using CooList.WebApi.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace CooList.WebApi.Controllers.Mappings
{
    public static class PointListMappingExtensions
    {
        public static PointList ToPointListEntity(this PointListDetails details, int listId = 0)
        {
            return new PointList(listId, details.Name, new HashSet<PointCoordinate>(details.Points.Select(p => p.ToPointCoordinateEntity())));
        }

        public static PointCoordinate ToPointCoordinateEntity(this Coordinate coordinate)
        {
            return new PointCoordinate(coordinate.PointX, coordinate.PointY);
        }

        public static PointListDetails ToPointListDetails(this PointList list)
        {
            return new PointListDetails(list.Name, list.Points.Select(p => p.ToCoordinate()));
        }

        public static Coordinate ToCoordinate(this PointCoordinate coordinate)
        {
            return new Coordinate(coordinate.PointX, coordinate.PointY);
        }
    }
}
