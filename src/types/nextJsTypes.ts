export type NextPageProps<ParamKeys extends string = string> = {
  params: Promise<{ [key in ParamKeys]: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
