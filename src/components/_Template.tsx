import * as React from 'react';
import styled from 'styled-components';

export interface ComponentProps {
  resolve: (value: any) => void,
};

export function Component(props: ComponentProps) {
  return <div/>;
}

export const Block = styled.div`
  padding: 16px;
`;
