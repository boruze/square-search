using SquareSearch.Services.Interfaces;
using SquareSearch.Entities;
using SquareSearch.Entities.Enums;
using System.Threading.Tasks;
using System.Collections.Generic;
using CooList.WebApi.DataAccess.Interfaces;

namespace SquareSearch.Services
{
    public class CoordinateService : ICoordinateService
    {
        private readonly ICoordinateListRepository _cooListRepository;

        public CoordinateService(
                ICoordinateListRepository coordinateListRepository
            )
        {
            _cooListRepository = coordinateListRepository;
        }

        public async Task DeleteList(int id)
        {
            await _cooListRepository.DeleteAsync(id);
        }

        public async Task<CoordinateList> GetList(int id)
        {
            return await _cooListRepository.GetAsync(id).ConfigureAwait(false);
        }

        public async Task<CoordinateList> GetList(string name)
        {
            return await _cooListRepository.GetAsync(name).ConfigureAwait(false);
        }

        public async Task<IReadOnlyCollection<CoordinateList>> GetListofListsAsync(int limit, int offset, SortBy sortBy)
        {
            return await _cooListRepository.ListAsync(offset, limit, sortBy).ConfigureAwait(false);
        }

        public async Task<CoordinateList> SaveList(CoordinateList listItem)
        {
            if (listItem.Id > 0)
            {
                await _cooListRepository.UpdateAsync(listItem).ConfigureAwait(false);
            }
            else
            {
                var existingList = await _cooListRepository.GetAsync(listItem.Name).ConfigureAwait(false);
                if (existingList != null)
                {
                    var remappedList = new CoordinateList(existingList.Id, listItem.Name, listItem.Coordinates);
                    await _cooListRepository.UpdateAsync(remappedList).ConfigureAwait(false);
                }
                else
                {
                    await _cooListRepository.CreateAsync(listItem).ConfigureAwait(false);
                }
            }
            return await _cooListRepository.GetAsync(listItem.Name).ConfigureAwait(false);
        }
    }
}
