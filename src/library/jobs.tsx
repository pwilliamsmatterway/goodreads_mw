import { createPromiseWithCleanup } from '@matterway/js-core-with-cleanup';
import type { Context } from 'library/context';
import { Progressable } from 'library/progress';
import { map, merge } from 'lodash';
import pLimit from 'p-limit';

export type JobResult<T> = T | Error;
export type JobProgressUpdater = (update: Partial<Progressable>) => void;
export type JobHandler<T> = (ctx: JobContext) => Promise<T>;

export interface JobContext extends Context {
  progress: JobProgressUpdater;
}

export interface Job<T> {
  title: string;
  handler: JobHandler<T>;
}

export interface RunJobsOptions {
  concurrency?: number;
  onUpdate?(jobs: Progressable[]): void;
}

export async function runJobs<T>(ctx: Context, jobs: Job<T>[], options?: RunJobsOptions): Promise<JobResult<T>[]> {
  console.debug('runJobs: running jobs', { jobs, options });
  const Promise = createPromiseWithCleanup(ctx.signal);
  const limit = pLimit(options?.concurrency ?? 1);

  const preparedJobs = map(jobs, (job) => {
    function progress(update: Partial<Progressable>) {
      merge(progressable, update);
      options?.onUpdate?.(preparedJobs);
    }
    const jobCtx = { ...ctx, progress };
    const progressable = {
      name: job.title,
      status: 'pending' as const,
      promise: limit(makeProgressablePromise(jobCtx, job.handler)),
    };
    return progressable;
  });

  const result = await Promise.all(map(preparedJobs, 'promise'));
  console.debug('runJobs: resolved with', result);
  return result;
}

export function makeProgressablePromise<T>(ctx: JobContext, fn: JobHandler<T>): () => Promise<JobResult<T>> {
  return async () => {
    try {
      ctx.progress({ status: 'running' });
      const results = await fn(ctx);
      ctx.progress({ status: 'done' });
      return results;
    } catch (err) {
      ctx.progress({ status: 'failed' });
      return err as Error;
    }
  };
}
