"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/common/lib/redux/store";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const store = makeStore();

  return <Provider store={store}>{children}</Provider>;
};
