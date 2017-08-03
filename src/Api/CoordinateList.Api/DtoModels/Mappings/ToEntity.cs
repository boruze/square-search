using System.Collections.Generic;
using System.Linq;

namespace CoordinateList.Api.DtoModels.Mappings
{
    public static class ToEntity
    {
        public static Entities.CoordinateList ToCoordinateListEntity(this CoordinateListBase list)
        {
            return new Entities.CoordinateList(0, list.Name, new HashSet<Entities.Coordinate>());
        }

        public static Entities.CoordinateList ToCoordinateListEntity(this CoordinateListWithId list)
        {
            return new Entities.CoordinateList(list.Id, list.Name, new HashSet<Entities.Coordinate>());
        }

        public static Entities.CoordinateList ToCoordinateListEntity(this CoordinateList list)
        {
            return new Entities.CoordinateList(list.Id, list.Name, list.Coordinates.ToCoordinateEntitySet(list.Id)));
        }

        public static Entities.Coordinate ToCoordinateEntity(this CoordinateBase coo, int listId)
        {
            return new Entities.Coordinate(0, listId, coo.PointX, coo.PointY);
        }

        public static Entities.Coordinate ToCoordinateEntity(this CoordinateBaseWithId coo, int listId)
        {
            return new Entities.Coordinate(coo.Id, listId, coo.PointX, coo.PointY);
        }

        public static ISet<Entities.Coordinate> ToCoordinateEntitySet(this IEnumerable<CoordinateBase> cooList, int listId)
        {
            return new HashSet<Entities.Coordinate>(cooList.Select(c => c.ToCoordinateEntity(listId)));
        }

        public static ISet<Entities.Coordinate> ToCoordinateEntitySet(this IEnumerable<CoordinateBaseWithId> cooList, int listId)
        {
            return new HashSet<Entities.Coordinate>(cooList.Select(c => c.ToCoordinateEntity(listId)));
        }
    }
}
