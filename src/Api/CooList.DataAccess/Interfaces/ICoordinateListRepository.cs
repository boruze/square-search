using System.Collections.Generic;
using System.Threading.Tasks;
using SquareSearch.Entities;
using SquareSearch.Entities.Enums;
using System.Data;

namespace CooList.WebApi.DataAccess.Interfaces
{
    public interface ICoordinateListRepository
    {
        Task<CoordinateLists> ListAsync(int offset, int limit, SortBy sortBy);
        Task CreateAsync(CoordinateList item);
        Task<CoordinateList> GetAsync(string name);
        Task<CoordinateList> GetAsync(int id);
        Task UpdateAsync(CoordinateList item);
        Task DeleteAsync(int id);
    }
}
