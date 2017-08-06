using CooList.WebApi.DataAccess.Interfaces;
using CooList.WebApi.DataAccess.Filters;
using Npgsql;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CooList.WebApi.DataAccess
{

    public class PointListUnitOfWork : IPointListUnitOfWork
    {
        private readonly IPointListRepository _pointListRepo;
        private readonly ICoordinateRepository  _coordinateRepo;
        private string _dbConnectionString;

        public PointListUnitOfWork(
                IPointListRepository pointListRepo,
                ICoordinateRepository coordinateRepo,
                string dbConnectionString)
        {
            _coordinateRepo = coordinateRepo;
            _pointListRepo = pointListRepo;
            _dbConnectionString = dbConnectionString;
        }

        public async Task<int> Save(PointList list)
        {
            var id = list.Id;
            using (var con = new NpgsqlConnection(_dbConnectionString))
            using (var trans = con.BeginTransaction())
            {
                if (id > 0)
                {
                    await _pointListRepo.UpdateAsync(list, con, trans).ConfigureAwait(false);
                    await _coordinateRepo.DeleteAsync(list.Id, con).ConfigureAwait(false);
                }
                else
                {
                    id = await _pointListRepo.CreateAsync(list, con, trans).ConfigureAwait(false);
                }
                if (list.Points.Count > 0)
                {
                    await _coordinateRepo.CreateAsync(id, list.Points, con, trans).ConfigureAwait(false);
                }
                await trans.CommitAsync().ConfigureAwait(false);
            }
            return id;
        }

        public async Task<PointList> Get(int id)
        {
            using (var con = new NpgsqlConnection(_dbConnectionString))
            {
                var coordinates = await _coordinateRepo.GetAsync(id).ConfigureAwait(false);
                var list = await _pointListRepo.GetAsync(id).ConfigureAwait(false);
                list.Points = coordinates;
                return list;
            }
        }

        public async Task<IReadOnlyCollection<PointList>> GetList(int offset, int limit, SortBy sortBy)
        {
            using (var con = new NpgsqlConnection(_dbConnectionString))
            {
                return await _pointListRepo.ListAsync(offset, limit, sortBy).ConfigureAwait(false);
            }
        }

        public async Task Delete(int listId)
        {
            using (var con = new NpgsqlConnection(_dbConnectionString))
            {
                await _pointListRepo.DeleteAsync(listId, con).ConfigureAwait(false);
            }
        }
    }
}
