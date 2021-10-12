import { chromium } from 'playwright';
import axios from 'axios';
import getLinks from './getLinks';

(async function Scrapper() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.amazon.co.uk/', { timeout: 0});
    const searchPhrase = 'iphone 12';

    await page.fill('input[id="twotabsearchtextbox"]', searchPhrase);
    await page.click('input[id="nav-search-submit-button"]', {timeout: 0});

    const results = await page.waitForSelector('div[class="a-section a-spacing-small a-spacing-top-small"]');

    
    if (results) {
        const links = await page.$$('h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"]>a');
        const finalData = await getLinks(links, page);

        const url = 'https://car-rental-7028b-default-rtdb.firebaseio.com/amazon.json'; //use your own db endpoint here!!
        const response = await axios(url, {
            method: 'POST',
            headers: {
                'contents-type': 'application/json'
            },
            data: finalData
        });

        if (response.status === 200) {
            console.log('success!!');
        }
    }

    await page.close();
})();