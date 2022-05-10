import { connectToAgent } from '@matterway/agent-puppeteer-client/lib';
import { useAgentConnectionFactory } from '@matterway/background-hooks';
import { Context } from 'library/context';
import { showProgress } from 'library/progress';
import { navigateToAmazonStep } from './@navigateToAmazonStep';

export async function getRandomBookURLStep(
    ctx: Context, data: {
        genreURL: string;
    }
) {
    // ...

    // This might take a while. let's show progress, for good measure
    await showProgress(ctx, 'Starting background tasks...');

    // We connect to agent
    const agent = await connectToAgent(ctx.signal, {
        createAgentConnection: useAgentConnectionFactory(),
        //     browserLocationPathForDebugging:
        //       '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        //   
    }
    );
    const { genreURL } = data
    const baseURL = `https://www.goodreads.com`
    const page = await agent.newPage();
    // <- Here we will use the background browser ->
    await page.goto(`${baseURL}${genreURL}`);
    let titleAndAuthorString = await page.evaluate(() => {
        const items: any = document.querySelectorAll('.answerWrapper');
        if (items) {
            const randIndex: number = Math.floor(Math.random() * items.length);
            const titleAndAuthorString = items[randIndex].querySelector('img').getAttribute('alt');
            // const goodReadsID: string = items[randIndex].firstElementChild.getAttribute('data-resource-id');
            // const url = `https://www.goodreads.com/buy_buttons/12/follow?book_id=${goodReadsID}`;
            return titleAndAuthorString;
        }
    })

    // Disconnect the browser after its job is done.
    await agent.disconnect();
    if(titleAndAuthorString) {
        return await navigateToAmazonStep(ctx, {titleAndAuthorString: titleAndAuthorString})
    }

}