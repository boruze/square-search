using CooList.WebApi.DataAccess.Interfaces;
using Moq;
using SquareSearch.Services;
using System.Threading.Tasks;
using Xunit;

namespace SquareSearch.Tests.Services
{
    public class CoordinateServiceTests
    {
        private Mock<ICoordinateListRepository> _cooRepoListMock;

        public CoordinateServiceTests()
        {
            _cooRepoListMock = new Mock<ICoordinateListRepository>();
        }

        [Fact]
        public void SaveList_ShouldOverrideIfListExists()
        {
            //arrange
            const string testListName = "test";
            var service = new CoordinateService(_cooRepoListMock.Object);
            _cooRepoListMock.Setup(c => c.GetAsync(testListName)).ReturnsAsync(new Entities.CoordinateList(0, testListName, null));

            //act
            service.SaveList(new Entities.CoordinateList(50, testListName, null)).Wait();

            _cooRepoListMock.Verify(c => c.UpdateAsync(It.IsAny<Entities.CoordinateList>()), Times.Once);
            _cooRepoListMock.Verify(c => c.CreateAsync(It.IsAny<Entities.CoordinateList>()), Times.Never);
        }


        [Fact]
        public void SaveList_ShouldUpdateIfIdIsGiven()
        {
            //arrange
            var service = new CoordinateService(_cooRepoListMock.Object);
            //act
            service.SaveList(new Entities.CoordinateList(50, "test", null)).Wait();

            _cooRepoListMock.Verify(c => c.UpdateAsync(It.IsAny<Entities.CoordinateList>()), Times.Once);
            _cooRepoListMock.Verify(c => c.CreateAsync(It.IsAny<Entities.CoordinateList>()), Times.Never);
        }

        [Fact]
        public void SaveList_ShouldNotOverrideIfListDoesNotExists()
        {
            //arrange
            const string testListName = "testNew";
            var service = new CoordinateService(_cooRepoListMock.Object);
            _cooRepoListMock.Setup(c => c.GetAsync(testListName)).Returns(Task.FromResult<Entities.CoordinateList>(null));

            //act
            service.SaveList(new Entities.CoordinateList(0, testListName, null)).Wait();

            _cooRepoListMock.Verify(c => c.CreateAsync(It.IsAny<Entities.CoordinateList>()), Times.Once);
            _cooRepoListMock.Verify(c => c.UpdateAsync(It.IsAny<Entities.CoordinateList>()), Times.Never);
        }
    }
}
