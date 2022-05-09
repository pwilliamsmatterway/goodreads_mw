import {BackgroundReact as React, getContentComponentsProxy} from '@matterway/background-react';
import {useSkillDebugger} from '@matterway/skill-debugger';
import type {Context} from 'library/context';
import {successStep} from 'steps/@success';

const {
  // Import your components here
} = getContentComponentsProxy<typeof import('components')>();


export async function someNextActionStep(ctx: Context, data: {
  // Pass all data for this and next steps here
}) {
  console.log('step: someNextActionStep', data);
  const pause = useSkillDebugger(ctx.signal);
  const {browser, page, render} = ctx;

  // Write your code here. Remove when done
  await pause();

  // Change this to point to your next step
  return await successStep(ctx);
}
