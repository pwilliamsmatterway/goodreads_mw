import { BackgroundReact as React, getContentComponentsProxy } from '@matterway/background-react';
import type { Context } from 'library/context';
import { handleErrorStep } from './@error';
import { getGenreSelectionListStep } from './@getGenreSelectionListStep';
import { getRandomBookURLStep } from './@getRandomBookURLStep';
const { SelectGenre } = getContentComponentsProxy<typeof import('components/selectGenre')>();

export async function getGenreSelectionStep(ctx: Context) {
  console.log('step: getGenreSelectionStep');
  const { render } = ctx;
  try {
    const genreOptions = await getGenreSelectionListStep(ctx);
    const selection: any = await render((resolve) => <SelectGenre resolve={resolve} options={genreOptions} />);
    return await getRandomBookURLStep(ctx, { genreURL: selection });
  } catch (error) {
    console.log(error);
    return await handleErrorStep(ctx, { err: new Error('An error has occurred. Please try again later.') });
  }
}
