using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace eBook.Services
{
    public class PDFDocService
    {
        public string ReadPDFFile(string fileName)
        {
            StringBuilder sb = new StringBuilder();
            PdfReader pdfReader = new PdfReader(fileName);
            for (int x = 1; x <= pdfReader.NumberOfPages; x++)
            {
                string currentText = "";
                currentText = PdfTextExtractor.GetTextFromPage(pdfReader, x);
                sb.Append(currentText);
            }
            pdfReader.Close();
            return sb.ToString();
        }
    }
}