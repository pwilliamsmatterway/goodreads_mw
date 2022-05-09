import React from 'react';
import styled from 'styled-components';
import {map} from 'lodash';
import type {ProgressableStatus, Progressable} from '../progress';

import {
  Vertical,
  ListItem,
  Spinner,
  IconBox,
} from '@matterway/assistant-design-system/content';


export interface ProgressListProps {
  items: Progressable[],
  Item?: typeof ProgressListItem,
}
export function ProgressList(p: ProgressListProps) {
  const Item = p.Item ?? ProgressListItem;
  return <Vertical gap={12}>
    {map(p.items, (job, i) => (
      <Item key={i} {...job}/>
    ))}
  </Vertical>;
}

export interface ProgressListItemProps {
  name: Progressable['name'],
  status: Progressable['status'],
  description?: Progressable['description'],
  Icon?: typeof JobStatusIcon,
}
export function ProgressListItem(p: ProgressListItemProps) {
  const Icon = p.Icon ?? JobStatusIcon;
  return <FixedListItem
    title={p.name}
    description={p.description ?? p.status}
    left={<Icon status={p.status}/>}
  />;
}

export interface JobStatusIconOptions {
  status: ProgressableStatus,
}
export function JobStatusIcon(p: JobStatusIconOptions) {
  return (
    p.status === 'running'? <Spinner size={32} hasPadding={false}/> :
    p.status === 'done'? <IconBox icon="checkmark" boxColor="#E7F1FD" iconColor="#3A95FF" /> :
    p.status === 'failed'? <IconBox icon="close" boxColor="#FBECE6" iconColor="#FF5E18"/> :
    <IconBox icon="gift" boxColor="transparent" iconColor="transparent"/>
  );
}

const FixedListItem = styled(ListItem)`
  margin-bottom: 0;
`;
