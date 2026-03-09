import { IApiResponse } from "@/types/generic";
import { baseApiSlice } from "../baseApiSlice";
import { IGoogleUser } from "@/types/user";

export interface ILocalLoginRequest {
  email: string;
  password: string;
}

const updateAuthCache = async (
  _arg: any,
  {
    dispatch,
    queryFulfilled,
  }: { dispatch: any; queryFulfilled: Promise<{ data: IApiResponse }> },
) => {
  try {
    const { data: loginResponse } = await queryFulfilled;

    if (loginResponse?.data?.user) {
      dispatch(
        authApiSlice.util.updateQueryData(
          "getCurrentUser",
          undefined,
          (draft) => {
            if (!draft) return; // Guard for empty cache
            if (!draft.data) draft.data = {};
            draft.data.user = loginResponse.data.user;
          },
        ),
      );
    }
  } catch (err) {
    console.error("Auth cache sync failed:", err);
  }
};

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    localLogin: builder.mutation<IApiResponse, ILocalLoginRequest>({
      query: (credentials) => ({
        url: `/auth/login/local`,
        method: "POST",
        data: credentials,
      }),
      onQueryStarted: updateAuthCache, // Reusing the helper
    }),

    socialLogin: builder.mutation<IApiResponse, IGoogleUser>({
      query: (data) => ({
        url: "/auth/login/social",
        method: "POST",
        data,
      }),
      onQueryStarted: updateAuthCache, // Reusing the helper
    }),

    getCurrentUser: builder.query<IApiResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation<IApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Successfully logged out on server, now wipe local cache
          dispatch(authApiSlice.util.resetApiState());
        } catch (err) {
          console.error("Logout request failed ", err);
        }
      },
    }),
  }),
  overrideExisting: "throw",
});

export const {
  useLocalLoginMutation,
  useSocialLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApiSlice;
