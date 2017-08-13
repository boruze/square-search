using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Npgsql;
using CooList.WebApi.DataAccess.Interfaces;
using SquareSearch.Entities;
using SquareSearch.Entities.Enums;
using System.Data;

namespace CooList.WebApi.DataAccess
{
    public class CoordinateListRepository : ICoordinateListRepository
    {
        private readonly string _dbConnStr;

        public CoordinateListRepository(string dbConnectionString)
        {
            _dbConnStr = dbConnectionString;
        }

        public async Task CreateAsync(CoordinateList item)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    var listId = (await con.QueryAsync<int>("insert into graph.list (did, name) values (DEFAULT, @name); SELECT currval('graph.list_id_seq');",
                        new { name = item.Name }, tran).ConfigureAwait(false)).Single();
                    await InsertCoordinatesAsync(listId, item.Coordinates, con, tran).ConfigureAwait(false);
                    tran.Commit();
                }
                con.Close();
            }
        }

        public async Task DeleteAsync(int id)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                await con.ExecuteAsync("delete from graph.list where did = @id", new { id = id }).ConfigureAwait(false);
            }
        }

        public async Task<CoordinateList> GetAsync(string name)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                var result = (await con.QueryAsync<CoordinateList>("select did as id, name from graph.list where name = @name",
                    new { name = name }).ConfigureAwait(false)).SingleOrDefault();
                if (result == null)
                {
                    return result;
                }
                var coordinates = (await con.QueryAsync<Coordinate>("select point_x as pointx, point_y as pointy from graph.coordinates where did_list = @did_list",
                    new { did_list = result.Id }).ConfigureAwait(false)).ToList();
                result.Coordinates = new HashSet<Coordinate>(coordinates);
                return result;
            }
        }

        public async Task<CoordinateList> GetAsync(int id)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                var result = (await con.QueryAsync<Coordinate>("select point_x as pointx, point_y as pointy from graph.coordinates where did_list = @did_list",
                    new { did_list = id }).ConfigureAwait(false)).ToList();
                var item = (await con.QueryAsync<CoordinateList>("select did as id, name from graph.list where did = @did",
                    new { did = id }).ConfigureAwait(false)).SingleOrDefault();
                if (item == null)
                {
                    return item;
                }
                item.Coordinates = new HashSet<Coordinate>(result);
                return item;
            }
        }

        public async Task<CoordinateLists> ListAsync(int offset, int limit, SortBy sortBy)
        {
            var orderBy = sortBy == SortBy.Name ? "name" : "did";
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                var result = (await con.QueryAsync<CoordinateList>("select did as id, name from graph.list order by " + orderBy + " asc limit @limit offset @offset",
                    new { limit = limit, offset = offset, order_by = orderBy }).ConfigureAwait(false)).ToList();
                var count = (await con.QueryAsync<int>("select count(*) from graph.list",
                    new { limit = limit, offset = offset, order_by = orderBy }).ConfigureAwait(false)).Single();
                return new CoordinateLists(count, result);
            }
        }

        public async Task UpdateAsync(CoordinateList item)
        {
            using (var con = new NpgsqlConnection(_dbConnStr))
            {
                con.Open();
                using (var tran = con.BeginTransaction())
                {
                    await con.ExecuteAsync("update graph.list set name = @name where did = @did; delete from graph.coordinates where did_list = @did;",
                        new { name = item.Name, did = item.Id }, tran).ConfigureAwait(false);
                    await InsertCoordinatesAsync(item.Id, item.Coordinates, con, tran).ConfigureAwait(false);
                    tran.Commit();
                }
                con.Close();
            }
        }

        private Task InsertCoordinatesAsync(int listId, ISet<Coordinate> coordinates, IDbConnection connection, IDbTransaction transaction)
        {
            if (coordinates.Count == 0)
            {
                return Task.CompletedTask;
            }
            return connection.ExecuteAsync("insert into graph.coordinates (did_list, point_x, point_y) values (@did_list, @point_x, @point_y)",
                coordinates.Select(c => new { did_list = listId, point_x = c.PointX, point_y = c.PointY }), transaction);
        }
    }
}
