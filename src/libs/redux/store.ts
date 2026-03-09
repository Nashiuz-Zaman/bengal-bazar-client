import { configureStore } from "@reduxjs/toolkit";

import productQuickViewReducer from "./features/productQuickView/productQuickViewSlice";
import { baseApiSlice } from "./apiSlices/baseApiSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import customerReducer from "./features/customer/customerSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      productQuickView: productQuickViewReducer,
      categories: categoriesReducer,
      customer: customerReducer,

      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApiSlice.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<AppStore["getState"]>;
export type TAppDispatch = AppStore["dispatch"];
