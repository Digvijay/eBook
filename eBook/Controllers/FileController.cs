using eBook.CustomAttributes.BasicAuthenticationAttribute;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;

namespace eBook.Controllers
{
    [RoutePrefix("api/file")]
    public class FileController : ApiController
    {
        [Route("upload")]
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
        [Route("download/{fileName}")]
        [HttpGet]
        public HttpResponseMessage DownloadFile(string fileName)
        {
            var path = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/Uploads/" + fileName + ".pdf"); ;
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(path, FileMode.Open);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = Path.GetFileName(path);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentLength = stream.Length;
            return result;
        }
    }
}