import { Skeleton } from '../ui/skeleton';

export const AssessmentFormSkeleton = () => {
  return (
    <section className={'max-w-150 flex flex-col gap-8 bg-card p-4'}>
      <span className="sr-only">Loading...</span>
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-100" />
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-120" />
      <Skeleton className="h-4 w-120" />
    </section>
  );
};
