import type { Context } from 'library/context';
import { ElementHandle } from 'puppeteer-core';
import { handleErrorStep } from './@error';
import { navigateToCheckoutStep } from './@navigateToCheckoutStep';
import { selectors } from '../shared/selectors';

export async function addToCartStep(ctx: Context) {
  console.log('step: addToCartStep');
  const { page } = ctx;

  try {
    const addTocartButton: ElementHandle<Element> | null = await page.$(selectors.AZ_ADD_TO_CART_BUTTON);
    if (!addTocartButton) {
      throw 'No Add to Cart Button.';
    }
    await page.click(selectors.AZ_ADD_TO_CART_BUTTON);
    return await navigateToCheckoutStep(ctx);
  } catch (e) {
    if (typeof e == 'string') {
      handleErrorStep(ctx, { err: new Error(e) });
    }
  }
}
