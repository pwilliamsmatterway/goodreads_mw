import type {Context} from 'library/context';
import { ElementHandle } from 'puppeteer-core';
import { navigateToCheckoutStep } from './@navigateToCheckoutStep';

export async function addToCartStep(ctx: Context) {
  console.log('step: addToCartStep');
  const {browser, page, render} = ctx;

  // Write your code here. Remove when done
    try {
        const addTocartButton: ElementHandle<Element> | null = await page.$('[id^=add-to-cart-button]');
        if (!addTocartButton) {
            throw 'No Add to Cart Button.'
        }
        await page.click('[id^=add-to-cart-button]');
        return await navigateToCheckoutStep(ctx);
    } catch (e) {
        console.log(e);
    }
}
