import { connectToAgent } from '@matterway/agent-puppeteer-client/lib';
import { useAgentConnectionFactory } from '@matterway/background-hooks';
import { Context } from 'library/context';
import { showProgress } from 'library/progress';
import { GOODREADS_BASE_URL, GOODREADS_BEST_BOOKS_URL } from 'shared/constants';
import { selectors } from '../shared/selectors';

export async function getGenreSelectionListStep(ctx: Context) {
  await showProgress(ctx, 'Starting background tasks...');

  const agent = await connectToAgent(ctx.signal, {
    createAgentConnection: useAgentConnectionFactory(),
  });
  const page = await agent.newPage();
  console.log('step: getGenreSelectionListStep');
  await page.goto(`${GOODREADS_BASE_URL}${GOODREADS_BEST_BOOKS_URL}`);
  const genreOptions = await page.evaluate((selectors) => {
    let results: any[] = [];
    let items: NodeList = document.querySelectorAll(selectors.GOODREADS_CATEGORY_SELECTOR);
    if (items) {
      items.forEach((item: any) => {
        results.push({
          value: item.querySelector('a').getAttribute('href'),
          label: item.querySelector('a').querySelector('h4').textContent.replace(/\n/g, ''),
        });
      });
    }
    return results;
  }, selectors);

  await agent.disconnect();
  return genreOptions;
}
