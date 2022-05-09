import {BackgroundReact as React, getContentComponentsProxy} from '@matterway/background-react';
import type {Context} from 'library/context';

const {
  Bubble,
  Result,
} = getContentComponentsProxy<typeof import('components')>();


export async function handleErrorStep(ctx: Context, data: {
  err: Error,
}) {
  console.log('Step: handleErrorStep', data);

  await ctx.render(resolve => (
    <Bubble>
      <Result
        resolve={resolve}
        icon="close-circle"
        title="Oops. Something went wrong"
        text={`Assistant has encountered unexpected circumstances, and is unable to proceed. The following error message will help support investigate the issue: "${data.err.message}"`}
        button="Dismiss"
      />
    </Bubble>
  ));
}
