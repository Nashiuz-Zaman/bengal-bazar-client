// import { IApiResponse, TQueryDataWithQueryMeta } from "@/types/shared";
// import { baseApiSlice } from "@/libs/redux/api-slices/base.api.slice";
// import { IPayment

// export const paymentApiSlice = baseApiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getPayments: builder.query<
//       IApiResponse<TQueryDataWithQueryMeta<{ payments: IPayment[] }>>,
//       Record<string, any>
//     >({
//       query: (params) => ({
//         url: `/payments`,
//         method: "GET",
//         params: {
//           limitFields: "orderId,name,email,amount,status",
//           ...params,
//         },
//       }),
//     }),
//   }),

//   overrideExisting: "throw",
// });

// // ----------
// // Exports
// // ----------
// export const { useGetPaymentsQuery } = paymentApiSlice;
