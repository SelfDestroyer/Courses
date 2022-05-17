import puppeteer from 'puppeteer';

describe('Testing routes', () => {

  const baseURL = 'http://localhost:3000';
  let browser;
  let page;

  beforeAll(async() => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    page = await browser.newPage();
  });

  test('Path "/": the page should render content described in subtasks only after navigating to appropriate routes', async() => {
    await page.goto(`${baseURL}`);
    const includesSubtasks = await page.$eval('div', el => el.innerHTML.includes('Subtask'));
    expect(includesSubtasks).toBe(false);
  });

  describe('Path "/subtask1" with parameters: the page should render "div" with information', () => {

    const path = 'subtask1';
    const etalonContent = 'Subtask1, parameter:';
    const parameters = [3, 5];
    const etalon = parameters.map(par => new RegExp(`<div> *${etalonContent} ${par} *</div>`));

    parameters.forEach((parameter, idx) => {
      test(`after navigating to the path "${path}" page should contain information about parameter (case${idx+1})`, async() => {
        await page.goto(`${baseURL}/${path}/${parameter}`);
        const pageContent = await page.$eval('div', el => el.innerHTML);
        expect(pageContent).toEqual(expect.stringMatching(etalon[idx]));
      });
    })
  })

  describe('Path "/subtask2" with query: the page should render "div" with information', () => {

    const path = 'subtask2';
    const etalonContent = 'Subtask2, query parameters:';
    const queries = ['name=user1', 'name=usr&role=admin'];
    const etalon = queries.map(par => new RegExp(`<div> *${etalonContent} ${par.replace(/&/g, ', ')} *</div>`));

    queries.forEach((query, idx) => {
      test(`after navigating to the path "${path}" page should contain information about query (case${idx+1})`, async() => {
        await page.goto(`${baseURL}/${path}?${query}`);
        const pageContent = await page.$eval('div', el => el.innerHTML);
        expect(pageContent).toEqual(expect.stringMatching(etalon[idx]));
      });
    })
  })
  
  describe('Path "/subtask3", protected: the page should render only if condition is success', () => {
    const path = 'subtask3';
    const etalonContent = 'Subtask3, protected information';
    const etalon = new RegExp(`<div> *${etalonContent} *</div>`);
    
    test('clicking on the link should contain information when condition is satisfied', async () => {
      await page.type('input', '1');
      await page.click('a');
      const pageContent = await page.$eval('div', el => el.innerHTML);
      expect(pageContent).toEqual(expect.stringMatching(etalon));
    });
    
    test(`the path should be "/${path}"`, () => {
      expect(page.url()).toEqual(expect.stringMatching(path));
    });
    
    test('clicking on the link should not contain information when condition is not satisfied', async () => {
      await page.type('input', '2');
      await page.click('a');
      const pageContent = await page.$eval('div', el => el.innerHTML);
      expect(pageContent).toEqual(expect.not.stringMatching(etalon));
    });
  });
  
  describe('Path "/subtask4", can be navigated programmatically', () => {
    const path = 'subtask4';
    const etalonContent = 'Subtask4, navigated programmatically';
    const etalon = new RegExp(`<div> *${etalonContent} *</div>`);
    
    test('information should be rendered by checking the box', async () => {
      await page.click('input[type=checkbox]');
      const pageContent = await page.$eval('div', el => el.innerHTML);
      expect(pageContent).toEqual(expect.stringMatching(etalon));
    });
    
    test(`the path should be "/${path}"`, () => {
      expect(page.url()).toEqual(expect.stringMatching(path));
    });

  });

  afterAll(() => {
    browser.close();
  });
})