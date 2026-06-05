import { IApiResponse } from "@/types/shared";
import { baseApiSlice } from "@/common/api/base.api.slice";

export const userApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Public Account Routes ---
    registerUser: builder.mutation<IApiResponse, any>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        data,
      }),
    }),

    verifyUser: builder.query<IApiResponse, { token: string; email: string }>({
      query: ({ token, email }) => ({
        url: `/users/verify`,
        method: "GET",
        params: { token, email },
      }),
    }),

    resendVerification: builder.mutation<IApiResponse, { email: string }>({
      query: (data) => ({
        url: "/users/resend-verification",
        method: "POST",
        data,
      }),
    }),

    // --- Retrieval Routes ---

    getUsers: builder.query<IApiResponse, any>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params, // Handles pagination/filters
      }),
      providesTags: ["UsersAdmin"],
    }),

    getUserById: builder.query<IApiResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),

    // --- Admin Batch Routes ---

    blockUsers: builder.mutation<IApiResponse, { userIds: string[] }>({
      query: (data) => ({
        url: "/users/block",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["UsersAdmin"],
    }),

    unblockUsers: builder.mutation<IApiResponse, { userIds: string[] }>({
      query: (data) => ({
        url: "/users/unblock",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["UsersAdmin"],
    }),

    deleteUsers: builder.mutation<IApiResponse, { userIds: string[] }>({
      query: (data) => ({
        url: "/users/delete",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["UsersAdmin"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserQuery,
  useResendVerificationMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBlockUsersMutation,
  useUnblockUsersMutation,
  useDeleteUsersMutation,
} = userApiSlice;
