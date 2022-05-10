import { Context } from 'library/context';
import { successStep } from './@success';

export async function navigateToCheckoutStep(
    ctx: Context
) {
    try {
        console.log('step: navigateToCheckoutStep')
        const { page } = ctx;
        await page.waitForNavigation()
        await page.click('[data-feature-id=proceed-to-checkout-action]', )
        return await successStep(ctx)
    } catch (error) {
     console.log(error);
    }
}