export const getQueryParamsFromSearchParams = (
  searchParams: URLSearchParams,
  keys: string[],
): Record<string, string | number | boolean> => {
  const result: Record<string, string | number | boolean> = {};

  for (const key of keys) {
    const value = searchParams.get(key)?.trim() ?? "";

    if (value === "true") {
      result[key] = true;
    } else if (value === "false") {
      result[key] = false;
    } else if (value !== "" && Number.isFinite(Number(value))) {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }

  return result;
};

export const buildUrlWithParams = (
  basePath: string,
  queryParams: Record<string, any>,
): string => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value != null && value !== "") {
      params.set(key, String(value));
    }
  });

  return `${basePath}?${params.toString()}`;
};
