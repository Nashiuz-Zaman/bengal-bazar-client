import { configureStore } from "@reduxjs/toolkit";

import { baseApiSlice } from "../../api/base.api.slice";
import backdropReducer from "./slices/backdropSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      backdrop: backdropReducer,
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApiSlice.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<AppStore["getState"]>;
export type TAppDispatch = AppStore["dispatch"];
