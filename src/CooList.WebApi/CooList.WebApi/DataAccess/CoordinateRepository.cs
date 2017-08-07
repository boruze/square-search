using CooList.WebApi.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

namespace CooList.WebApi.DataAccess
{
    public class CoordinateRepository : ICoordinateRepository
    {
        public Task<int> CreateAsync(int parentId, ISet<PointCoordinate> coordinates, IDbConnection connection, IDbTransaction transaction)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id, IDbConnection connection)
        {
            throw new NotImplementedException();
        }

        public Task<ISet<PointCoordinate>> GetAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
