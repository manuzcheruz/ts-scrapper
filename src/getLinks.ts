import { ElementHandle, Page } from 'playwright';

interface Data {
    title?: string;
    description?: string;
    ratings?: string;
    storeUrl?: string;
    price?: string;
}

async function getLinks(links: ElementHandle<SVGElement | HTMLElement>[], page: Page) {
    const initialLinks: string[] = [];
    const finalData: Data[] = [];

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        initialLinks.push(`https://www.amazon.co.uk${await link.getAttribute('href')}`);
    }

    while (initialLinks.length) {
        const start = initialLinks.shift();
        if (start) {
            await page.goto(start, { timeout: 0 });

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

    return finalData;
}

export default getLinks;