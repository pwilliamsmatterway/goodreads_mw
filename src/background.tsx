import {useAbortSignal, useCallerTabId} from '@matterway/background-hooks';
import {BackgroundRenderer} from '@matterway/background-react';
import {connectToChrome} from '@matterway/puppeteer-for-chrome';
import {startStep} from 'steps/@start';
import {handleErrorStep} from 'steps/@error';
import manifest from 'manifest.json';

export default async function() {
  console.clear();
  const tabId = useCallerTabId();
  const signal = useAbortSignal();
  const browser = await connectToChrome(signal);
  const page = await browser.pageByTabId(tabId);
  const render = BackgroundRenderer.create(signal, {portName: `skill-${manifest.identifier}`, tabId});
  const ctx = {tabId, signal, browser, page, render};

  try {
    await startStep(ctx);
  } catch (err) {
    console.error(err);
    await handleErrorStep(ctx, {err: err as Error})
    throw err;
  }
}
