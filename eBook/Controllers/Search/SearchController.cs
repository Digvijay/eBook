using eBook.Database;
using eBook.Models;
using eBook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eBook.Controllers.Search
{
    public class SearchController : ApiController
    {
        private EBookDbContext db = new EBookDbContext();

        [HttpGet]
        public IHttpActionResult Get(string query, string searchField)
        {
            List<string> searchResultIds = LuceneService.SearchOnIndex(query, "eBookId", searchField);
            List<EBook> searchResults = new List<EBook>();

            foreach (var searchResultId in searchResultIds)
            {
                var id = int.Parse(searchResultId);
                searchResults.Add(db.EBooks.AsNoTracking().SingleOrDefault(x => x.EBookId == id));
            }

            return Ok(searchResults);
        }

        [HttpPost]
        public IHttpActionResult GetMultiple(Dictionary<string, string> searchCriteria)
        {
            List<string> searchResults = new List<string>();

            foreach (KeyValuePair<string, string> criteria in searchCriteria)
            {
                searchResults.AddRange(LuceneService.SearchOnIndex(criteria.Value, "eBookId", criteria.Key));
            }


            return Ok(searchResults);
        }

    }
}
