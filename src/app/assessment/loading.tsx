import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { Skeleton } from '@nextui-org/skeleton';

const AssessmentPageLoading = () => {
  const sections = 5;
  const array = Array.from({ length: sections }, (_, i) => i);
  const headerDivClassName = 'h-4 rounded-lg bg-default-300';

  return (
    <section className="flex justify-center">
      <Card className="w-[450px]" radius="lg">
        <CardHeader className="grid grid-cols-1">
          <div className="h-6">
            <Skeleton className="w-1/5 rounded-lg my-1">
              <div className={headerDivClassName}></div>
            </Skeleton>
          </div>
          <div className="h-6">
            <Skeleton className="w-3/5 rounded-lg my-1">
              <div className={headerDivClassName}></div>
            </Skeleton>
          </div>
          <div className="h-6">
            <Skeleton className="w-2/5 rounded-lg my-1">
              <div className={headerDivClassName}></div>
            </Skeleton>
          </div>
          <div className="h-6">
            <Skeleton className="w-4/5 rounded-lg my-1">
              <div className={headerDivClassName}></div>
            </Skeleton>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="grid justify-center gap-4 p-4 grid-cols-1">
          {array.map((i) => {
            return (
              <div key={i} className="h-20 space-y-4 py-1">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            );
          })}
        </CardBody>
        <CardFooter className="justify-end">
          <Button type="submit" isLoading>
            Loading
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AssessmentPageLoading;
