import {BackgroundReact as React, getContentComponentsProxy} from '@matterway/background-react';
import {useSkillDebugger} from '@matterway/skill-debugger';
import type {Context} from 'library/context';
import { ElementHandle } from 'puppeteer-core';
import {successStep} from 'steps/@success';

const {
  // Import your components here
} = getContentComponentsProxy<typeof import('components')>();


export async function addToCartStep(ctx: Context) {
  console.log('step: addToCartStep');
  const pause = useSkillDebugger(ctx.signal);
  const {browser, page, render} = ctx;

  // Write your code here. Remove when done
    try {
        const addTocartButton: ElementHandle<Element> | null = await page.$('[id^=add-to-cart-button]');
        if (!addTocartButton) {
            throw 'No Add to Cart Button.'
        }
        await page.click('[id^=add-to-cart-button]');
        await page.waitForNavigation()
        await pause()
        // return await successStep(ctx);
    } catch (e) {
        console.log(e);
    }
//   await pause();

  // Change this to point to your next step
}
