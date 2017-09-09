using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using eBook.Database;
using eBook.Models;

namespace eBook.Controllers
{
    public class EBooksController : ApiController
    {
        private EBookDbContext db = new EBookDbContext();

        // GET: api/EBooks
        public IQueryable<EBook> GetEBooks()
        {
            return db.EBooks;
        }

        // GET: api/EBooks/5
        [ResponseType(typeof(EBook))]
        public IHttpActionResult GetEBook(int id)
        {
            EBook eBook = db.EBooks.Find(id);
            if (eBook == null)
            {
                return NotFound();
            }

            return Ok(eBook);
        }

        // PUT: api/EBooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEBook(int id, EBook eBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eBook.EBookId)
            {
                return BadRequest();
            }

            db.Entry(eBook).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EBooks
        [ResponseType(typeof(EBook))]
        public IHttpActionResult PostEBook(EBook eBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EBooks.Add(eBook);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = eBook.EBookId }, eBook);
        }

        // DELETE: api/EBooks/5
        [ResponseType(typeof(EBook))]
        public IHttpActionResult DeleteEBook(int id)
        {
            EBook eBook = db.EBooks.Find(id);
            if (eBook == null)
            {
                return NotFound();
            }

            db.EBooks.Remove(eBook);
            db.SaveChanges();

            return Ok(eBook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EBookExists(int id)
        {
            return db.EBooks.Count(e => e.EBookId == id) > 0;
        }
    }
}