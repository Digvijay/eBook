using eBook.CustomAttributes.BasicAuthenticationAttribute;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;

namespace eBook.Controllers
{
    public class FileUploadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UploadFile()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/App_Data/Uploads/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);

                    PdfReader reader = new PdfReader(filePath);
                    Dictionary<string, string> metadata = reader.Info;
                    reader.Close();

                    return Ok(metadata);
                }
            }
            return BadRequest();
        }
    }
}