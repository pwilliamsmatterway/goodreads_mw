import { BackgroundReact as React, getContentComponentsProxy } from '@matterway/background-react';
import { useSkillDebugger } from '@matterway/skill-debugger';
import type { Context } from 'library/context';
import { addToCartStep } from './@addToCartStep';

export async function switchToPhysicalMediumStep(ctx: Context) {
    console.log('step: switchToPhysicalMediumStep');
    const pause = useSkillDebugger(ctx.signal);
    const { browser, page, render } = ctx;
    const AMAZON_BASE_URL = 'https://www.amazon.de'

    const isNonPhysicalEdition = async (): Promise<Boolean | undefined> => {
        try {
            const nonPhysical = await page.evaluate(() => {
                const kindle = document.getElementById("productSubtitle")?.textContent?.toLowerCase().includes('kindle')
                const audible = document.getElementById("productBinding")?.textContent?.toLowerCase().includes('audible')
                return !!(kindle || audible);
            })
            return nonPhysical;
        } catch (e) {
            console.error(e)
        }
    }

    const switchToPhysicalEdition = async (): Promise<void> => {
        try {
            let [button] = await page.$x("//span[text()[contains(.,'Hardcover')  or contains(.,'Paperback')]]")
            let text = await page.evaluate(span => span.parentElement.getAttribute('href'), button);
            await page.goto(`${AMAZON_BASE_URL}${text}`);
        } catch (e) {
            console.error(e)
        }

    }
    try {
        if (await isNonPhysicalEdition()) {
            await switchToPhysicalEdition();
        }
        return await addToCartStep(ctx);
    } catch (error) {
        console.log(error)

    }

}
