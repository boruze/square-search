using System.Linq;

namespace SquareSearch.Api.DtoModels.Mappings
{
    public static class ToDto
    {
        public static Coordinate ToCoordinateBaseDto(this Entities.Coordinate coo)
        {
            return new Coordinate(coo.PointX, coo.PointY);
        }
        public static CoordinateList ToCoordinateListDto(this Entities.CoordinateList coo)
        {
            return new CoordinateList(coo.Id, coo.Name, coo.Coordinates.Select(c => c.ToCoordinateBaseDto()).ToList());
        }
        public static CoordinateListContainer ToCoordinateListContainerDto(this Entities.CoordinateLists coo)
        {
            return new CoordinateListContainer(coo.TotalCount, coo.Items.Select(ToCoordinateListDto).ToList());
        }
    }
}
