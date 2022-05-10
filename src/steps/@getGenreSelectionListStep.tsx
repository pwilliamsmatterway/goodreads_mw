import {connectToAgent} from '@matterway/agent-puppeteer-client/lib';
import {useAgentConnectionFactory} from '@matterway/background-hooks';
import { pauseToDebug } from '@matterway/skill-debugger';
import { Context } from 'library/context';
import {showProgress} from 'library/progress';

export async function getGenreSelectionListStep(
  ctx: Context,
) {
  // ...

  // This might take a while. let's show progress, for good measure
  await showProgress(ctx, 'Starting background tasks...');

  // We connect to agent
  const agent = await connectToAgent(ctx.signal, {
    createAgentConnection: useAgentConnectionFactory(),
    // browserLocationPathForDebugging:
    //   '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
}
);
const page = await agent.newPage();
  console.log('step: getGenreSelectionListStep');
  await page.goto(`https://www.goodreads.com/choiceawards/best-books-2021`)
  const genreOptions = await page.evaluate(() => {
    let results: any[] = [];
    let items: NodeList = document.querySelectorAll('.category');
    if (items) {
      items.forEach((item: any) => {
        results.push({
          value: item.querySelector("a").getAttribute('href'),
          label: item.querySelector("a").querySelector("h4").textContent.replace(/\n/g, "")
        });
      });
    }
    return results;
  })
  // Disconnect the browser after its job is done.
  await agent.disconnect();
  return genreOptions
  
  // ...
}