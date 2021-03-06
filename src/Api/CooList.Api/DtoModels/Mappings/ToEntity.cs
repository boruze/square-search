﻿using System.Collections.Generic;
using System.Linq;

namespace SquareSearch.Api.DtoModels.Mappings
{
    public static class ToEntity
    {
        public static Entities.CoordinateList ToCoordinateListEntity(this CoordinateList list, int id)
        {
            return new Entities.CoordinateList(
                id,
                list.Name,
                list.Coordinates != null ? list.Coordinates.ToCoordinateEntitySet() : new HashSet<Entities.Coordinate>());
        }

        public static Entities.Coordinate ToCoordinateEntity(this Coordinate coo)
        {
            return new Entities.Coordinate(coo.PointX, coo.PointY);
        }
        
        public static ISet<Entities.Coordinate> ToCoordinateEntitySet(this IEnumerable<Coordinate> cooList)
        {
            return new HashSet<Entities.Coordinate>(cooList.Select(c => c.ToCoordinateEntity()));
        }
    }
}
