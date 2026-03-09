import { configureStore } from "@reduxjs/toolkit";

import { baseApiSlice } from "./apiSlices/baseApiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApiSlice.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<AppStore["getState"]>;
export type TAppDispatch = AppStore["dispatch"];
