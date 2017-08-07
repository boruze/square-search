using CooList.WebApi.DataAccess;
using CooList.WebApi.DataAccess.Filters;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CooList.WebApi.DataAccess.Interfaces
{
    public interface IPointListRepository
    {
        Task<IReadOnlyCollection<PointList>> ListAsync(int offset, int limit, SortBy sortBy);
        Task<int> CreateAsync(PointList item, IDbConnection connection, IDbTransaction transaction);
        Task<PointList> GetAsync(int id);
        Task UpdateAsync(PointList item, IDbConnection connection, IDbTransaction transaction);
        Task DeleteAsync(int id, IDbConnection connection);
    }
}
