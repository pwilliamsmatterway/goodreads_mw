import { Context } from 'library/context';
import { selectors } from '../shared/selectors';
import { successStep } from './@success';

export async function navigateToCheckoutStep(ctx: Context) {
  try {
    console.log('step: navigateToCheckoutStep');
    const { page } = ctx;
    await page.waitForNavigation();
    await page.click(selectors.AZ_PROCEED_TO_CHECKOUT_BUTTON);
    return await successStep(ctx);
  } catch (error) {
    console.log(error);
  }
}
