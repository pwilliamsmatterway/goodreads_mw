import { RenderFunction } from '@matterway/background-react';
import { ChromeBrowser } from '@matterway/puppeteer-for-chrome/lib';
import { Browser, Page } from 'puppeteer-core';

export interface Context {
  tabId: number;
  signal: AbortSignal;
  browser: Browser | ChromeBrowser;
  page: Page;
  render: RenderFunction;
}
