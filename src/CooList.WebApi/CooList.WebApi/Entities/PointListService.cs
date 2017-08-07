using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CooList.WebApi.DataAccess.Filters;
using CooList.WebApi.DataAccess;

namespace CooList.WebApi.DataAccess
{
    public interface IPointListService
    {
        Task<PointList> SaveAsync(PointList listEntity);
        Task<PointList> GetAsync(int listId);
        Task<IReadOnlyCollection<PointList>> GetListAsync(int offset, int limit, SortBy sortBy);
        Task DeleteAsync(int listId);
    }

    public class PointListService : IPointListService
    {
        private readonly IPointListUnitOfWork _unitOfWork;

        public PointListService(IPointListUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task DeleteAsync(int listId)
        {
            await _unitOfWork.Delete(listId);
        }

        public async Task<PointList> GetAsync(int listId)
        {
            return await _unitOfWork.Get(listId).ConfigureAwait(false);
        }

        public async Task<IReadOnlyCollection<PointList>> GetListAsync(int offset, int limit, SortBy sortBy)
        {
            return await _unitOfWork.GetList(offset, limit, sortBy).ConfigureAwait(false);
        }

        public async Task<PointList> SaveAsync(PointList listEntity)
        {
            var id = await _unitOfWork.Save(listEntity).ConfigureAwait(false);
            return await _unitOfWork.Get(id).ConfigureAwait(false);
        }
    }
}
