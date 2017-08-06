using CooList.WebApi.Controllers.Contracts;
using CooList.WebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CooList.WebApi.DataAccess.Filters;
using CooList.WebApi.Controllers.Mappings;
using System.Linq;

namespace CooList.WebApi.Controllers
{
    [Route("list/v1")]
    public class ListController: ControllerBase
    {
        private readonly IPointListService _service;

        public ListController(IPointListService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync([FromBody]PointListDetails list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var listEntity = list.ToPointListEntity();
            return Ok(await _service.SaveAsync(listEntity).ConfigureAwait(false));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateAsync(int listId, [FromBody]PointListDetails list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var listEntity = list.ToPointListEntity(listId);
            return Ok(await _service.SaveAsync(listEntity).ConfigureAwait(false));
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(int listId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _service.GetAsync(listId).ConfigureAwait(false);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result.ToPointListDetails());
        }

        [HttpGet]
        public async Task<ActionResult> GetListAsync(int offset, int limit, SortByFilter sortBy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _service.GetListAsync(offset, limit, (SortBy)sortBy).ConfigureAwait(false);
            return Ok(result.Select(l => l.ToPointListDetails()).ToList());
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteAsync(int listId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _service.DeleteAsync(listId).ConfigureAwait(false);
            return NoContent();
        }
    }
}