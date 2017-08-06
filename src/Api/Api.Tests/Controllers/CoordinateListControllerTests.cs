using Microsoft.AspNetCore.Mvc;
using Moq;
using SquareSearch.Api.Controllers;
using SquareSearch.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace SquareSearch.Tests.Controllers
{
    public class CoordinateListControllerTests
    {
        private readonly Mock<ICoordinateService> _cooServiceMock;

        public CoordinateListControllerTests()
        {
            _cooServiceMock = new Mock<ICoordinateService>();
        }

        [Fact]
        public void PutAsync_ShouldReturnBadRequest_IfModelStateHasIssues()
        {
            //arrange
            var controller = new CoordinateListController(_cooServiceMock.Object);
            controller.ModelState.AddModelError("id", "could not parse value");

            //act
            var result = controller.PutAsync(10, new Api.DtoModels.CoordinateList(10, "test", null)).Result;

            //verify
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void PutAsync_ShouldReturnBadRequest_IfModelIsInvalid()
        {
            //arrange
            const int id = 10;
            _cooServiceMock.Setup(s => s.GetList(id)).ReturnsAsync(new Entities.CoordinateList(id, "test"));
            var controller = new CoordinateListController(_cooServiceMock.Object);

            //act
            var result = controller.PutAsync(
                10,
                new Api.DtoModels.CoordinateList(
                    10,
                    "test",
                    new List<Api.DtoModels.Coordinate>(){ new Api.DtoModels.Coordinate(999999999, 52) })
                    ).Result;

            //verify
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void PutAsync_ShouldReturNotFound_IfListDoesNotExist()
        {
            //arrange
            const int id = 852;
            _cooServiceMock.Setup(s => s.GetList(id)).Returns(Task.FromResult<Entities.CoordinateList>(null));
            var controller = new CoordinateListController(_cooServiceMock.Object);

            //act
            var result = controller.PutAsync(10, new Api.DtoModels.CoordinateList(10, "test", null)).Result;

            //verify
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void PostAsync_ShouldReturnBadRequest_IfModelStateHasIssues()
        {
            //arrange
            var controller = new CoordinateListController(_cooServiceMock.Object);
            controller.ModelState.AddModelError("id", "could not parse value");

            //act
            var result = controller.PostAsync(new Api.DtoModels.CoordinateList(10, "test", null)).Result;

            //verify
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void PostAsync_ShouldReturnBadRequest_IfModelIsInvalid()
        {
            //arrange
            const int id = 10;
            _cooServiceMock.Setup(s => s.GetList(id)).ReturnsAsync(new Entities.CoordinateList(id, "test"));
            var controller = new CoordinateListController(_cooServiceMock.Object);

            //act
            var result = controller.PostAsync(
                new Api.DtoModels.CoordinateList(
                    10,
                    "test",
                    new List<Api.DtoModels.Coordinate>() { new Api.DtoModels.Coordinate(999999999, 52) })
                    ).Result;

            //verify
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void DeleteAsync_ShouldReturnNotFound_IfListDoesNotExist()
        {
            //arrange
            const int id = 8522;
            _cooServiceMock.Setup(s => s.GetList(id)).Returns(Task.FromResult<Entities.CoordinateList>(null));
            var controller = new CoordinateListController(_cooServiceMock.Object);

            //act
            var result = controller.DeleteAsync(id).Result;

            //verify
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
