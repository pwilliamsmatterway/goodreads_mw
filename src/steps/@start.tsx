import type { Context } from 'library/context';
import { showMessage } from 'library/message';
import manifest from 'manifest.json';
import { getGenreSelectionStep } from './@getGenreSelectionStep';

export async function startStep(ctx: Context) {
  console.log('step: startStep');
  await showMessage(ctx, {
    title: manifest.name,
    description: manifest.description,
    text: 'Assistant will help you process this task.',
    buttons: [{ text: "Let's go!", value: 'ok' }],
  });

  return await getGenreSelectionStep(ctx);
}
