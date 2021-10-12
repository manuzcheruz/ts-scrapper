import { chromium } from 'playwright';
import axios from 'axios';

(async function Scrapper() {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.amazon.co.uk/', { timeout: 0});
    const searchPhrase = 'iphone 12';

    await page.fill('input[id="twotabsearchtextbox"]', searchPhrase);
    await page.click('input[id="nav-search-submit-button"]', {timeout: 0});

    const results = await page.waitForSelector('div[class="a-section a-spacing-small a-spacing-top-small"]');

    interface Data {
        title?: string;
        description?: string;
        ratings?: string;
        storeUrl?: string;
        price?: string;
    }

    const initialLinks: string[] = [];
    const finalData: Data[] = [];
    if (results) {
        const links = await page.$$('h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"]>a');
        for (let link of links) {
            initialLinks.push(`https://www.amazon.co.uk${await link.getAttribute('href')}`);
        }


        while(initialLinks.length) {
            const start = initialLinks.shift();
            if (start){
                await page.goto(start, {timeout: 0});

                const title = await page.$('h1[id="title"]');
                const storeUrl = await page.$('div[class="a-section a-spacing-none"]>a[id="bylineInfo"]');
                const description = await page.$('div[id="feature-bullets"]');
                const ratings = await page.$('span[id="acrCustomerReviewText"]');

                const data: Data = {
                    title: await title?.innerText(),
                    storeUrl: await storeUrl?.innerText(),
                    description: await description?.innerText(),
                    ratings: await ratings?.innerText()
                }

                finalData.push(data);
            }
        }

        const url = 'https://car-rental-7028b-default-rtdb.firebaseio.com/amazon.json';
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