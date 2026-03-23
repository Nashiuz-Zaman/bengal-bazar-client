import { baseApiSlice } from "./base.api.slice";
import {
  IProduct,
  IProductSearchQueryParams,
  ISearchbarResultProduct,
  IUpdateProductArgs,
} from "@/types/product";
import {
  IApiResponse,
  IMultipleResourceQueryParams,
  TQueryDataWithQueryMeta,
} from "@/types/shared";

// --- API slice ---
export const productsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAdmin: builder.query<
      IApiResponse<TQueryDataWithQueryMeta<{ products: IProduct[] }>>,
      IMultipleResourceQueryParams
    >({
      query: (params) => ({
        url: `/products/admin`,
        method: "GET",
        params,
      }),
      providesTags: (_result, _error, params) => [
        { type: "ProductsAdmin", id: JSON.stringify({ limit: 10, ...params }) },
      ],
    }),

    searchbarResults: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{
          products: ISearchbarResultProduct[];
        }>
      >,
      string
    >({
      query: (searchText) => ({
        url: "/products/search",
        method: "GET",
        params: {
          limitFields: "title,defaultImage,slug",
          limit: 10,
          page: 1,
          search: searchText,
        },
      }),
    }),

    searchProducts: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{
          products: IProduct[];
          brands: string[];
        }>
      >,
      IProductSearchQueryParams
    >({
      query: (params) => ({
        url: "/products/search",
        method: "GET",
        params,
      }),
    }),

    getProductAdmin: builder.query<IApiResponse, string>({
      query: (id) => ({
        url: `/products/${id}/admin`,
        method: "GET",
      }),
    }),

    createProduct: builder.mutation<IApiResponse, Partial<IProduct>>({
      query: (data) => ({
        url: `/products/`,
        method: "POST",
        data,
      }),
    }),

    updateProduct: builder.mutation<IApiResponse, IUpdateProductArgs>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ProductsAdmin"],
    }),

    getProductColletionProducts: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{
          products: IProduct[];
        }>
      >,
      { slug: string; params?: Record<string, any> }
    >({
      query: ({ slug, params }) => ({
        url: `/products/product-collection/${slug}`,
        method: "GET",
        params,
      }),
    }),

    bulkDeleteProducts: builder.mutation<IApiResponse, string[]>({
      query: (ids) => ({
        url: "/products/bulk-delete",
        method: "PATCH",
        data: { ids },
      }),
      invalidatesTags: ["ProductsAdmin"],
    }),
  }),

  overrideExisting: "throw",
});

// ----------
// Exports
// ----------
export const {
  useGetProductsAdminQuery,
  useGetProductAdminQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useBulkDeleteProductsMutation,
  useGetProductColletionProductsQuery,
  useSearchProductsQuery,
  useLazySearchbarResultsQuery,
} = productsApiSlice;
