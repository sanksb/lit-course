require('chromedriver');
const { browserConfig } = require('../config.js');

const NewsComponentPage = require('../pages/NewsComponentPage.js');
const CommonPage = require('../pages/CommonPage.js');

describe('News searcher', () => {
  let driver;
  let newsComponent;
  let common;

  before(async () => {
    driver = await browserConfig();

    newsComponent = new NewsComponentPage(driver);
    common = new CommonPage(driver);
  });

  it('Page title is correct', async () => common.checkPageTitle());
  it('Go to form example view', async () => common.goToFromHomePage('News searcher'));
  it('Default search "Polymer" return 20 results', async () => newsComponent.numberOfSearchResults(20));

  after(() => driver && driver.quit());
});