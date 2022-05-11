import { Context } from 'library/context';
import { AMAZON_BASE_URL } from 'shared/constants';
import { selectors } from '../shared/selectors';
import { switchToPhysicalMediumStep } from './@switchToPhysicalMediumStep';

export async function navigateToAmazonStep(ctx: Context, data: { titleAndAuthorString: string }) {
  try {
    console.log('step: navigateToAmazonStep');

    const { page } = ctx;
    const { titleAndAuthorString } = data;
    await page.goto(AMAZON_BASE_URL);
    await page.type(selectors.AZ_SEARCH_BOX, titleAndAuthorString);
    await page.click(selectors.AZ_SUBMIT_BUTTON);
    await page.waitForSelector(selectors.AZ_FIRST_SEARCH_RESULT);
    let productListingLink = await page.evaluate((selectors) => {
      return document
        .querySelector(selectors.AZ_FIRST_SEARCH_RESULT)
        ?.querySelector('h2 a.a-link-normal')
        ?.getAttribute('href');
    }, selectors);

    if (!productListingLink) {
      throw 'Unable to get product listing link.';
    }
    if (productListingLink) {
      await page.goto(`${AMAZON_BASE_URL}${productListingLink}`, { waitUntil: 'domcontentloaded' });
    }
    return await switchToPhysicalMediumStep(ctx);
  } catch (error) {
    console.log(error);
  }
}
