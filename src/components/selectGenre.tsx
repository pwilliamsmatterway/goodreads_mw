import { Bubble, Choice, TaskProgress } from '@matterway/assistant-design-system/lib/src';
import * as React from 'react';
import styled from 'styled-components';

interface GenreChoice {
  label: string;
  value: string;
}

export interface ComponentProps {
  resolve: (value: any) => void;
  options: GenreChoice[];
}

export function SelectGenre(props: ComponentProps) {
  const { options, resolve } = props;

  return (
    <Bubble>
      <Choice defaultValue="update" options={options} optionsLabel="Select a Genre" resolve={resolve} />
    </Bubble>
  );
}

export const Block = styled.div`
  padding: 16px;
`;
