using Xunit;
using System.Linq;
using SquareSearch.Api.Validators;
using SquareSearch.Api.DtoModels;

namespace Api.Tests.Validators
{
    public class CoordinateValidatorTests
    {
        private readonly CoordinateValidator _validator;
        
        public CoordinateValidatorTests()
        {
            _validator = new CoordinateValidator();
        }

        [Fact]
        public void Validate_ShouldNotAllowToSetCoordinateHigherThanMaxAvailableValue()
        {
            //arrange
            var coordinate = new Coordinate(CoordinateValidator.largestCoordinate + 1, 0);

            //act
            var result = _validator.Validate(coordinate);

            //assert
            Assert.False(result.IsValid);
            Assert.Equal(result.Errors.Count, 1);
            Assert.Equal(result.Errors.First().PropertyName, nameof(Coordinate.PointX));
        }

        [Fact]
        public void Validate_ShouldNotAllowToSetCoordinateSmallerThanMinAvailableValue()
        {
            //arrange
            var coordinate = new Coordinate(0, CoordinateValidator.smallestCoordinate - 1);

            //act
            var result = _validator.Validate(coordinate);

            //assert
            Assert.False(result.IsValid);
            Assert.Equal(result.Errors.Count, 1);
            Assert.Equal(result.Errors.First().PropertyName, nameof(Coordinate.PointY));
        }
    }
}
