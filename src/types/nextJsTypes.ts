export type NextPageProps<ParamKeys extends string = string> = {
  params: Promise<{ [key in ParamKeys]: string }>;
  searchParams: Promise<SearchParamsType>;
};

export type SearchParamsType = Record<string, string | string[] | undefined>;
