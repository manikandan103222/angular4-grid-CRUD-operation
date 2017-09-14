import { Angular4gridexamplePage } from './app.po';

describe('angular4gridexample App', () => {
  let page: Angular4gridexamplePage;

  beforeEach(() => {
    page = new Angular4gridexamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
