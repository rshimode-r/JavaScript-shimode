type ModifyUrlParams = {
  base: string;
  addQuery?: [string, string][];
  path?: string;
};

export function modifyUrl({
  base,
  addQuery = [],
  path,
}: ModifyUrlParams): string {
  const url = new URL(base);
  if (path) url.pathname = path;
  for (const [key, value] of addQuery) url.searchParams.append(key, value);
  return url.toString();
}
