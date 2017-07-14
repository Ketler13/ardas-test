import { ArdasTestPage } from './app.po';

describe('ardas-test App', () => {
  let page: ArdasTestPage;

  beforeEach(() => {
    page = new ArdasTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
