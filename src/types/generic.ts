// ---------------------------------------------------------
// GENERIC API RESPONSE
// Standard structure returned from API endpoints
// ---------------------------------------------------------
export interface IApiResponse<T = any> {
  success: boolean;
  status?: string;
  message?: string;
  data?: T;
}

// ---------------------------------------------------------
// SORT OPTIONS
// Generic type for building sort dropdowns or API params
// ---------------------------------------------------------
export type TSortOptions<K extends Record<string, any>> = {
  label: string;
  value: TStringKeyOf<K>;
}[];

// ---------------------------------------------------------
// QUERY META
// Metadata for paginated queries
// ---------------------------------------------------------
export interface IQueryMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ---------------------------------------------------------
// QUERY DATA WITH META
// Combines resource data with pagination metadata
// ---------------------------------------------------------
export type TQueryDataWithQueryMeta<T extends Record<string, any>> = T & {
  queryMeta: IQueryMeta;
};

// ---------------------------------------------------------
// STRING KEY OF
// Extracts only string keys from a type
// ---------------------------------------------------------
export type TStringKeyOf<T> = Extract<keyof T, string>;

export interface IMultipleResourceQueryParams {
  page: number;
  q: string;
  search: string;
  limitFields?: string;
  limit?: number;
}
