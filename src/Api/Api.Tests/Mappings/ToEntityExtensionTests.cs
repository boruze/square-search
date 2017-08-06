using SquareSearch.Api.DtoModels;
using SquareSearch.Api.DtoModels.Mappings;
using Xunit;

namespace SquareSearch.Tests.Mappings
{
    public class ToEntityExtensionTests
    {
        [Fact]
        public void ToCoordinateListEntity_ShouldMapToEmptyHashSetIfCoordinatesAreNull()
        {
            //act
            const int id = 150;
            var mapResult = new CoordinateList(id, "test", null).ToCoordinateListEntity(0);

            //verify
            Assert.NotNull(mapResult.Coordinates);
        }
    }
}
