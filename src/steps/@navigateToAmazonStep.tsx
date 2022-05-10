import { Context } from 'library/context';

import { switchToPhysicalMediumStep } from './@switchToPhysicalMediumStep';

export async function navigateToAmazonStep(
    ctx: Context,
    data: { titleAndAuthorString: string }
) {
    console.log('step: navigateToAmazonStep');
    try {
        const AMAZON_BASE_URL = 'https://www.amazon.com'
        const { page } = ctx;
        const { titleAndAuthorString } = data;
        await page.goto('https://www.amazon.com')
        await page.type('#twotabsearchtextbox', titleAndAuthorString)
        await page.click('#nav-search-submit-button');
        await page.waitForNavigation()
        let productListingLink = await page.evaluate(() => {
            return document.querySelector('[cel_widget_id^=MAIN-SEARCH_RESULTS]')
                ?.querySelector('h2 a.a-link-normal')
                ?.getAttribute('href');
        })
        if (!productListingLink) {
            throw "Unable to get product listing link.";
        }
        if(productListingLink) {
            await page.goto(`${AMAZON_BASE_URL}${productListingLink}`)
            await page.waitForNavigation()
        }
        return await switchToPhysicalMediumStep(ctx)
    } catch (error) {
     console.log(error);
        
    }
}