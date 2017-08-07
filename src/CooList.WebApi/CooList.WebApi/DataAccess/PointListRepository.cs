using System.Collections.Generic;
using CooList.WebApi.DataAccess.Filters;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Npgsql;
using CooList.WebApi.DataAccess.Interfaces;
using System.Data;

namespace CooList.WebApi.DataAccess
{
    public class PointListRepository : IPointListRepository
    {
        private readonly string _dbConnStr;

        public PointListRepository(string dbConnectionString)
        {
            _dbConnStr = dbConnectionString;
        }

        public async Task<int> CreateAsync(PointList item, IDbConnection connection, IDbTransaction transaction)
        {
            var id = (await connection.QueryAsync<int>("insert into graph.list (name, deleted) values @name, 0; select scope_identity();",
                new[] {new {name = item.Name}}, transaction).ConfigureAwait(false)).Single();
            if (item.Points.Count > 0)
            {
                await connection.QueryAsync("insert into graph.coordinates (did_list, point_x, point_y) values @did_list, @point_x, @point_y",
                    item.Points.Select(p => new { did_list = item.Id, point_x = p.PointX, point_y = p.PointY }), transaction).ConfigureAwait(false);
            }
            transaction.Commit();
            return id;
        }
        
        public async Task DeleteAsync(int id, IDbConnection connection)
        {
            await connection.QueryAsync("update graph.list set deleted = 1 where did = @did",
                new[] { new { did = id } }).ConfigureAwait(false);
        }

        public async Task<PointList> GetAsync(int id)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                return (await con.QueryAsync<PointList>("select did, name from graph.list where did = @id",
                    new[] { new { did = id } }).ConfigureAwait(false)).Single();
            }
        }

        public async Task<IReadOnlyCollection<PointList>> ListAsync(int offset, int limit, SortBy sortBy)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                return (await con.QueryAsync<PointList>("select did, name from graph.list limit = @limit offset = @offset order by @order_by",
                    new[] { new { limit = limit, offset = offset, order_by = sortBy } }).ConfigureAwait(false)).ToList();
            }
        }

        public async Task UpdateAsync(PointList item, IDbConnection connection, IDbTransaction transaction)
        {
            await connection.QueryAsync("update graph.list set name = @name where did = @did",
                new[] { new { name = item.Name, did = item.Id } }, transaction).ConfigureAwait(false);
            await connection.QueryAsync("delete from graph.coordinates where did_list = @did_list", new[] { new { did_list = item.Id } });
            if (item.Points.Count > 0)
            {
                await connection.QueryAsync("insert into graph.coordinates (did_list, point_x, point_y) values @did_list, @point_x, @point_y",
                    item.Points.Select(p => new { did_list = item.Id, point_x = p.PointX, point_y = p.PointY }), transaction).ConfigureAwait(false);
            }
            transaction.Commit();
        }
    }
}
