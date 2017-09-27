using eBook.Database;
using eBook.Models;
using iTextSharp.text.pdf;
using Lucene.Net.Analysis;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers;
using Lucene.Net.Search;
using Lucene.Net.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eBook.Services
{
    public class LuceneService
    {
        private static EBookDbContext db = new EBookDbContext();
        private static RAMDirectory directory = new RAMDirectory(); // In memory index

        private static PDFDocService pdfDocService = new PDFDocService();

        static LuceneService()
        {
            directory = CreateIndex() as RAMDirectory;
        }

        private static Directory CreateIndex()
        {
            using (Analyzer analyzer = new StandardAnalyzer(Lucene.Net.Util.Version.LUCENE_30))
            using (var writer = new IndexWriter(directory, analyzer, new IndexWriter.MaxFieldLength(1000)))
            { // the writer and analyzer will popuplate the directory with docuemnts

                db.EBooks.ToList().ForEach(eBook => {
                    var doc = new Document();

                    doc.Add(new Field("eBookId", eBook.EBookId.ToString(), Field.Store.YES, Field.Index.ANALYZED));
                    doc.Add(new Field("title", eBook.Title, Field.Store.YES, Field.Index.ANALYZED));
                    doc.Add(new Field("author", eBook.Author, Field.Store.YES, Field.Index.ANALYZED));
                    doc.Add(new Field("keywords", eBook.Keywords, Field.Store.YES, Field.Index.ANALYZED));
                    doc.Add(new Field("language", eBook.Language.LanguageName, Field.Store.YES, Field.Index.ANALYZED));
                    doc.Add(new Field("content", "empty seed content...", Field.Store.YES, Field.Index.ANALYZED));

                    writer.AddDocument(doc);
                });

                writer.Optimize();
                writer.Flush(true, true, true);
            }

            return directory;
        }

        /// <summary>
        /// Return a list of ids for matching documents
        /// </summary>
        /// <param name="directory">Lucene Index</param>
        /// <param name="query">query used to return results</param>
        /// <param name="primaryKey">Name of a field (usually primary key) to be returned as the identifier of the matching document</param>
        /// <param name="targetFieldName">Name of the Field to search on</param>
        /// <returns></returns>
        public static List<string> SearchOnIndex(string query, string primaryKey, string targetFieldName)
        {
            var pks = new List<string>();// list of primary key matches

            using (var analyzer = new StandardAnalyzer(Lucene.Net.Util.Version.LUCENE_30))
            using (var reader = IndexReader.Open(directory, true))
            using (var searcher = new IndexSearcher(reader))
            {
                // We are only searching on one Field (targetFieldName)
                // In this case the field contains all the content of the document
                // In a real world example you would be able to search on any field
                // possibly taking the field name form the query
                var parsedQuery = new QueryParser(Lucene.Net.Util.Version.LUCENE_30, targetFieldName, analyzer).Parse(query);

                //NotifyInformation(parsedQuery.ToString());

                int hitsPerPage = 10;

                var collector = TopScoreDocCollector.Create(hitsPerPage, true);

                searcher.Search(parsedQuery, collector);

                var matches = collector.TopDocs().ScoreDocs;

                for (int i = 0; i < matches.Length; ++i)
                {
                    int docId = matches[i].Doc; // internal document id

                    var document = searcher.Doc(docId);

                    pks.Add(document.GetField(primaryKey).StringValue);
                }
            }

            return pks;
        }

        public static void RegisterNewLuceneDoc(EBook eBook)
        {
            using (Analyzer analyzer = new StandardAnalyzer(Lucene.Net.Util.Version.LUCENE_30))
            using (var writer = new IndexWriter(directory, analyzer, new IndexWriter.MaxFieldLength(1000)))
            { // the writer and analyzer will popuplate the directory with docuemnts
                var doc = new Document();

                doc.Add(new Field("eBookId", eBook.EBookId.ToString(), Field.Store.YES, Field.Index.ANALYZED));
                doc.Add(new Field("title", eBook.Title, Field.Store.YES, Field.Index.ANALYZED));
                doc.Add(new Field("author", eBook.Author, Field.Store.YES, Field.Index.ANALYZED));
                doc.Add(new Field("keywords", eBook.Keywords, Field.Store.YES, Field.Index.ANALYZED));
                doc.Add(new Field("language", eBook.Language.LanguageName, Field.Store.YES, Field.Index.ANALYZED));

                var pdfFilePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/Uploads/" + eBook.FileName);
                var pdfContent = pdfDocService.ReadPDFFile(pdfFilePath);

                doc.Add(new Field("content", pdfContent, Field.Store.YES, Field.Index.ANALYZED));

                writer.AddDocument(doc);

                writer.Optimize();
                writer.Flush(true, true, true);
            }
        }
    }
}