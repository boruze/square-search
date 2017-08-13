using Microsoft.AspNetCore.Mvc;
using SquareSearch.Api.DtoModels;
using SquareSearch.Services.Interfaces;
using System.Linq;
using SquareSearch.Api.DtoModels.Mappings;
using System.Threading.Tasks;
using SquareSearch.Api.Validators;

namespace SquareSearch.Api.Controllers
{
    [Route("api/[controller]")]
    public class CoordinateListController : Controller
    {
        private readonly ICoordinateService _service;

        public CoordinateListController(ICoordinateService coordinateListService)
        {
            _service = coordinateListService;
        }

        // GET api/values
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }

            var result = await _service.GetList(id).ConfigureAwait(false);            
            if (result == null)
            {
                return new NotFoundResult();
            }

            return new ObjectResult(result.ToCoordinateListDto());
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetListAsync(int limit, int offset, SortBy sortBy = SortBy.Id)
        {
            var result = await _service.GetListofListsAsync(limit, offset, (Entities.Enums.SortBy)sortBy).ConfigureAwait(false);
            return new ObjectResult(result.Select(r => r.ToCoordinateListDto()));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]CoordinateList value)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }

            var validator = new CoordinateListValidator();
            var validationResult = validator.Validate(value);

            if (!validationResult.IsValid)
            {
                return new BadRequestResult();
            }

            var result = await _service.SaveList(value.ToCoordinateListEntity(0)).ConfigureAwait(false);

            return new ObjectResult(result.ToCoordinateListDto());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody]CoordinateList value)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestResult();
            }

            var existingList = await _service.GetList(id).ConfigureAwait(false);
            if (existingList == null)
            {
                return new NotFoundResult();
            }

            var validator = new CoordinateListValidator();
            var validationResult = validator.Validate(value);

            if (!validationResult.IsValid)
            {
                return new BadRequestResult();
            }

            var result = await _service.SaveList(value.ToCoordinateListEntity(id)).ConfigureAwait(false);

            return new ObjectResult(result.ToCoordinateListDto());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var existingList = await _service.GetList(id).ConfigureAwait(false);
            if (existingList == null)
            {
                return new NotFoundResult();
            }

            await _service.DeleteList(id).ConfigureAwait(false);
            return new EmptyResult();
        }
    }
}
