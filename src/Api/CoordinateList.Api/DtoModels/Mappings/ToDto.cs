using System.Linq;

namespace CoordinateList.Api.DtoModels.Mappings
{
    public static class ToDto
    {
        public static CoordinateBaseWithId ToCoordinateBaseWithIdDto(this Entities.Coordinate coo)
        {
            return new CoordinateBaseWithId(coo.Id, coo.PointX, coo.PointY);
        }

        public static CoordinateBase ToCoordinateBaseDto(this Entities.Coordinate coo)
        {
            return new CoordinateBase(coo.PointX, coo.PointY);
        }

        public static CoordinateList ToCoordinateListDto(this Entities.CoordinateList coo)
        {
            return new CoordinateList(coo.Id, coo.Name, coo.Coordinates.Select(c => c.ToCoordinateBaseDto()).ToList());
        }
    }
}
