using System.Collections.Generic;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using CoordinateList.Api.DtoModels;

namespace CoordinateList.Api.Controllers
{
    [Route("api/[controller]")]
    public class CoordinatesController: Controller
    {
        private readonly AbstractValidator<CoordinateList.Api.DtoModels.CoordinateList> _cooListValidator;
        private readonly AbstractValidator<CoordinateBase> _cooValidator;

        public CoordinatesController (
            AbstractValidator<CoordinateList.Api.DtoModels.CoordinateList> cooListValidator,
            AbstractValidator<CoordinateBase> cooValidator
        ) {
            _cooListValidator = cooListValidator;
            _cooValidator = cooValidator;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get(int listId)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            var result = new List<CoordinateBaseWithId>();
            result.Add(new CoordinateBaseWithId(10, 50, 5));
            result.Add(new CoordinateBaseWithId(10, 12, 51));
            return new ObjectResult(result);
        }

        // POST api/values
        [HttpPost("{listId}/coordinates")]
        public IActionResult Post(int listId, [FromBody]CoordinateBase coordinate)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            return new ObjectResult(coordinate);
        }

        // PUT api/values/5
        [HttpPut("{listId}/coordinates/{id}")]
        public IActionResult Put(int listId, int id, [FromBody]CoordinateBase coordinate)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            return new ObjectResult(coordinate);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
