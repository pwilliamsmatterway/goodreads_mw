import type {Context} from 'library/context';
import {showMessage} from 'library/message';
import {successStep} from 'steps/@success';
import manifest from 'manifest.json';

// DO NOT add your automation in this step. Rather, create another step from
// `_template.tsx`, and await it at the end of this step.

export async function startStep(ctx: Context) {
  console.log('step: startStep');

  await showMessage(ctx, {
    title: manifest.name,
    description: manifest.description,
    text: 'Assistant will help you process this task.',
    buttons: [
      {text: "Let's go!", value: 'ok'},
    ],
  });

  // Make a new step from `_template.tsx` and change this line to point to it
  await successStep(ctx);
}
