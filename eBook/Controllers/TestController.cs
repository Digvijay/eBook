using eBook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eBook.Controllers
{
    public class TestController : ApiController
    {

        // GET: api/Test
        public IEnumerable<string> Get(string query, string searchField)
        {
            return LuceneService.SearchOnIndex(query, "eBookId", searchField);
        }

        // GET: api/Test/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Test
        public void Post([FromBody]string value)
        {
            LuceneService.SearchOnIndex(value, "eBookId", "author");
        }

        // PUT: api/Test/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Test/5
        public void Delete(int id)
        {
        }
    }
}
