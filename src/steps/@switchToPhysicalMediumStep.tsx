import type { Context } from 'library/context';
import { AMAZON_BASE_URL } from 'shared/constants';
import { selectors } from '../shared/selectors';
import { addToCartStep } from './@addToCartStep';

export async function switchToPhysicalMediumStep(ctx: Context) {
  console.log('step: switchToPhysicalMediumStep');
  const { page } = ctx;

  const isNonPhysicalEdition = async (): Promise<Boolean | undefined> => {
    try {
      const nonPhysical = await page.evaluate(() => {
        const kindle = document.getElementById('productSubtitle')?.textContent?.toLowerCase().includes('kindle');
        const audible = document.getElementById('productBinding')?.textContent?.toLowerCase().includes('audible');
        return !!(kindle || audible);
      });
      return nonPhysical;
    } catch (e) {
      console.error(e);
    }
  };

  const switchToPhysicalEdition = async (): Promise<void> => {
    try {
      let [button] = await page.$x(selectors.AZ_PAPERBACK_OR_HARDCOVER);
      let bookUrl = await page.evaluate((span) => span.parentElement.getAttribute('href'), button);
      await page.goto(`${AMAZON_BASE_URL}${bookUrl}`);
    } catch (e) {
      console.error(e);
    }
  };
  try {
    if (await isNonPhysicalEdition()) {
      await switchToPhysicalEdition();
    }
    return await addToCartStep(ctx);
  } catch (error) {
    console.log(error);
  }
}
