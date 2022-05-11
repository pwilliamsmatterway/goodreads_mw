import { BackgroundReact as React, getContentComponentsProxy } from '@matterway/background-react';
import { Job, JobResult, runJobs, RunJobsOptions } from 'library/jobs';
import { filter, size } from 'lodash';
import type { Context } from 'library/context';

const { Bubble, Overlay, StepBar, Section, ProgressList, ProgressListItem } =
  getContentComponentsProxy<typeof import('components')>();

export type ProgressableStatus = 'pending' | 'running' | 'done' | 'failed';

export interface Progressable {
  status: ProgressableStatus;
  name: string;
  description?: string;
}

export async function showProgress(
  context: Context,
  title: string,
  options?: {
    description?: string;
    overlay?: boolean;
  },
) {
  console.debug('showProgress: rendering progress', { title, options });
  await context.render(
    <>
      {options?.overlay && <Overlay />}
      <Bubble>
        <Section>
          <ProgressListItem status="running" name={title} description={options?.description ?? 'In progress...'} />
        </Section>
      </Bubble>
    </>,
  );
}

export async function showProgressBar(
  context: Context,
  title: string,
  progress: number,
  options?: {
    total?: number;
    description?: string;
    overlay?: boolean;
  },
) {
  console.debug('showProgressBar: rendering progress bar', { title, progress, options });
  await context.render(
    <>
      {options?.overlay && <Overlay />}
      <Bubble>
        <StepBar title={title} description={options?.description} step={progress} steps={options?.total ?? 1} />
      </Bubble>
    </>,
  );
}

export async function showProgressList(
  context: Context,
  items: Progressable[],
  options?: {
    overlay?: boolean;
  },
) {
  console.debug('showProgressList: rendering progress list', { items, options });
  await context.render(
    <>
      {options?.overlay && <Overlay />}
      <Bubble>
        <Section>
          <ProgressList items={items} />
        </Section>
      </Bubble>
    </>,
  );
}

// UI Shortcuts
// —————————————————————————————————————————————————————————————————————————————

export async function runJobsWithProgress<T>(
  context: Context,
  title: string,
  jobs: Job<T>[],
  options?: RunJobsOptions,
): Promise<JobResult<T>[]> {
  console.debug('runJobsWithProgress: running jobs with progress', { title, jobs, options });
  showProgress(context, title);
  const result = await runJobs(context, jobs, options);
  console.debug('runJobsWithProgress: resolved with', result);
  return result;
}

export async function runJobsWithProgressBar<T>(
  context: Context,
  title: string,
  jobs: Job<T>[],
  options?: RunJobsOptions,
): Promise<JobResult<T>[]> {
  console.debug('runJobsWithProgressBar: running jobs with progress bar', { title, jobs, options });
  const result = await runJobs(context, jobs, {
    ...options,
    onUpdate: (jobs) => {
      const total = jobs.length;
      const completed = size(filter(jobs, ({ status }) => status == 'done' || status == 'failed'));
      showProgressBar(context, title, (1 / total) * completed);
    },
  });
  console.debug('runJobsWithProgressBar: resolved with', result);
  return result;
}

export async function runJobsWithProgressList<T>(
  context: Context,
  jobs: Job<T>[],
  options?: RunJobsOptions,
): Promise<JobResult<T>[]> {
  console.debug('runJobsWithProgressList: running jobs with progress list', { jobs, options });
  const result = await runJobs(context, jobs, {
    ...options,
    onUpdate: (jobs) => showProgressList(context, jobs),
  });
  console.debug('runJobsWithProgressList: resolved with', result);
  return result;
}
