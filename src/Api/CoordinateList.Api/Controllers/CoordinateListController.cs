using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CoordinateList.Api.DtoModels;

namespace CoordinateList.Api.Controllers
{
    [Route("api/[controller]")]
    public class CoordinatesListController : Controller
    {
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            var result = new List<CoordinateListWithId>();
            result.Add(new CoordinateListWithId(10, "test"));
            result.Add(new CoordinateListWithId(12, "testMock1"));
            return new ObjectResult(result);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            return new ObjectResult(new CoordinateList.Api.DtoModels.CoordinateList(id, "mock", new List<CoordinateBase>(){new CoordinateBase(10, 12)}));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]CoordinateList.Api.DtoModels.CoordinateList value)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            return new ObjectResult(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]string value)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            return new ObjectResult(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
