import { BackgroundReact as React, getContentComponentsProxy } from '@matterway/background-react';
import type { Context } from 'library/context';

const { Bubble, Result } = getContentComponentsProxy<typeof import('components')>();

export async function successStep(ctx: Context) {
  console.log('step: successStep');
  const { browser, page, render } = ctx;

  await render((resolve) => (
    <>
      <Bubble>
        <Result
          resolve={resolve}
          icon="checkmark-circle"
          title="Task processed successfully"
          text="The request has been processed succesfully. You can now dismiss Assistant and work on a new task."
          button="Thank you"
        />
      </Bubble>
    </>
  ));
}
