using SquareSearch.Entities;
using SquareSearch.Entities.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SquareSearch.Services.Interfaces
{
    public interface ICoordinateService
    {
        Task<CoordinateList> SaveList(CoordinateList listItem);
        Task<CoordinateList> GetList(int id);
        Task<CoordinateList> GetList(string name);
        Task<IReadOnlyCollection<CoordinateList>> GetListofListsAsync(int limit, int offset, SortBy sortBy);
        Task DeleteList(int id);
    }
}
