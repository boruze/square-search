using CoordinateList.Api.DtoModels;
using Xunit;
using System.Collections.Generic;
using System.Linq;

namespace Api.Tests.Validators
{
    public class CoordinateListValidatorTests
    {
        private CoordinateListValidator _validator;

        public CoordinateListValidatorTests()
        {
            _validator = new CoordinateListValidator();
        }

        [Fact]
        public void Validate_ShouldNotAllowMoreThanMaxAvailableCoordinations()
        {
            _validator = new CoordinateListValidator();
            //arrange
            var coordinates = new List<CoordinateBase>();
            for (var i = CoordinateValidator.smallestCoordinate; i <= CoordinateListValidator.MaxCoordinateCount / 2; i++)
            {
                coordinates.Add(new CoordinateBase(0, i));
            }
            var cooList = new CoordinateList.Api.DtoModels.CoordinateList(0, "test", coordinates);

            //act
            var result = _validator.Validate(cooList);

            //assert
            Assert.False(result.IsValid);
            Assert.Equal(result.Errors.Count, 1);
            Assert.Equal(result.Errors.First().PropertyName, nameof(CoordinateList.Api.DtoModels.CoordinateList.Coordinates));
        }

        [Fact]
        public void Validate_ShouldNotAllowDuplicateListPoints()
        {
            _validator = new CoordinateListValidator();
            //arrange
            var coordinates = new List<CoordinateBase>();
            coordinates.Add(new CoordinateBase(0, 0));
            coordinates.Add(new CoordinateBase(0, 0));
            var cooList = new CoordinateList.Api.DtoModels.CoordinateList(0, "test", coordinates);

            //act
            var result = _validator.Validate(cooList);
            
            //assert
            Assert.False(result.IsValid);
            Assert.Equal(result.Errors.Count, 1);
            Assert.Equal(result.Errors.First().PropertyName, nameof(CoordinateList.Api.DtoModels.CoordinateList.Coordinates));
        }
    }
}
