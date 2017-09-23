import { EBookPage } from './app.po';

describe('ebook App', () => {
  let page: EBookPage;

  beforeEach(() => {
    page = new EBookPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
