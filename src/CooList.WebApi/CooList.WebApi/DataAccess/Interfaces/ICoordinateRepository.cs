using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CooList.WebApi.DataAccess.Interfaces
{
    public interface ICoordinateRepository
    {
        Task<int> CreateAsync(
            int parentId, ISet<PointCoordinate> coordinates,
            IDbConnection connection, IDbTransaction transaction);
        Task<ISet<PointCoordinate>> GetAsync(int id);
        Task DeleteAsync(int id, IDbConnection connection);
    }
}
