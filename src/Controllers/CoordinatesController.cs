using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace src.Controllers
{
    [Route("api/[controller]")]
    public class CoordinatesController : Controller
    {
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
        [HttpPost]
        public IActionResult Post([FromBody]CoordinateBase coordinate)
        {
            if (!ModelState.IsValid){
                return new BadRequestResult();
            }
            return new ObjectResult(coordinate);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]CoordinateBase coordinate)
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
