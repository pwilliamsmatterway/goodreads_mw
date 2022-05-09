import {BackgroundReact as React, getContentComponentsProxy} from '@matterway/background-react';
import {useSkillDebugger} from '@matterway/skill-debugger';
import type {Context} from 'library/context';

const {
  Bubble,
  Result,
} = getContentComponentsProxy<typeof import('components')>();

// You can duplicate this step to represent different endings for this task
// which are not "technical errors", such as "could not find the material".

export async function successStep(ctx: Context) {
  console.log('step: successStep');
  const pause = useSkillDebugger(ctx.signal);
  const {browser, page, render} = ctx;

  // Only add logic here if it is performing closure specific to this ending

  await render((resolve) => <>
    <Bubble>
      <Result
        resolve={resolve}
        icon="checkmark-circle"
        title="Task processed successfully"
        text="The request has been processed succesfully. You can now dismiss Assistant and work on a new task."
        button="Thank you"
      />
    </Bubble>
  </>);
}
