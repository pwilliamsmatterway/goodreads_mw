import { connectToAgent } from '@matterway/agent-puppeteer-client/lib';
import { useAgentConnectionFactory } from '@matterway/background-hooks';
import { Context } from 'library/context';
import { showProgress } from 'library/progress';
import { GOODREADS_BASE_URL } from 'shared/constants';
import { selectors } from '../shared/selectors';
import { navigateToAmazonStep } from './@navigateToAmazonStep';

export async function getRandomBookURLStep(
  ctx: Context,
  data: {
    genreURL: string;
  },
) {
  await showProgress(ctx, 'Starting background tasks...');
  const agent = await connectToAgent(ctx.signal, {
    createAgentConnection: useAgentConnectionFactory(),
  });
  const { genreURL } = data;
  const page = await agent.newPage();
  await page.goto(`${GOODREADS_BASE_URL}${genreURL}`);
  let titleAndAuthorString = await page.evaluate((selectors) => {
    const items: any = document.querySelectorAll(selectors.GOODREADS_ANSWER_WRAPPER);
    if (items) {
      const randIndex: number = Math.floor(Math.random() * items.length);
      const titleAndAuthorString = items[randIndex].querySelector('img').getAttribute('alt');
      return titleAndAuthorString;
    }
  }, selectors);

  await agent.disconnect();
  if (titleAndAuthorString) {
    return await navigateToAmazonStep(ctx, { titleAndAuthorString: titleAndAuthorString });
  }
}
