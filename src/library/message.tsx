import {BackgroundReact as React, getContentComponentsProxy} from '@matterway/background-react';
import type {Context} from 'library/context';
import {map} from 'lodash';

const {
  Bubble,
  Group,
  Text,
  Toolbar,
} = getContentComponentsProxy<typeof import('components')>();


const DEFAULT_BUTTONS = [
  {text: 'Proceed', value: 'ok'},
];

export interface MessageButton {
  text: string,
  value: string,
}

export async function showMessage(ctx: Context, options: {
  text: string,
  title?: string,
  description?: string,
  buttons?: MessageButton[],
}) {
  console.debug('showMessage: rendering message', options);

  const action = await ctx.render((resolve) => {
    const actions = map(options.buttons ?? DEFAULT_BUTTONS, (button) => ({
      ...button,
      onClick: () => resolve(button.value),
    }));

    return (
      <Bubble>
        <Group title={options.title} description={options.description}>
          <Text>{options.text}</Text>
        </Group>
        <Toolbar actions={actions}/>
      </Bubble>
    );
  });

  console.debug('showMessage: resolved with', action);
  return action;
}
