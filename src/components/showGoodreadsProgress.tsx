import { TaskProgress, TaskProgressItem } from '@matterway/assistant-design-system/lib/src';
import * as React from 'react';
import styled from 'styled-components';

export interface ComponentProps {
    resolve: (value: any) => void,
};

export function ShowGoodreadsProgress(props: ComponentProps, tasks: TaskProgressItem[]) {
    const { resolve } = props;
    return (
        <TaskProgress
            button="Thanks"
            resolve={resolve}
            tasks={[
                {
                    description: 'Task done',
                    status: 'done',
                    title: 'Lint source'
                },
                {
                    description: 'Task completed with warnings',
                    status: 'warning',
                    title: 'Build project'
                },
                {
                    description: 'Task failed with error',
                    status: 'error',
                    title: 'Test executable'
                },
                {
                    description: 'Task in progress',
                    status: 'progress',
                    title: 'Clean up'
                }
            ]}
            text="Status for all build tasks:"
        />
    )
}

export const Block = styled.div`
  padding: 16px;
`;
