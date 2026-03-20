"use client";

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  RefObject,
  useContext,
} from "react";

export type TRefs = Record<string, RefObject<any> | null>;

export interface IRefsContext {
  refs: TRefs;
  setRefs: Dispatch<SetStateAction<TRefs>>;
}

export const RefsContext = createContext<IRefsContext | undefined>(undefined);

export interface IRefsProviderProps {
  children: ReactNode;
  initialValue?: TRefs;
}

export const RefsProvider = ({
  children,
  initialValue = {},
}: IRefsProviderProps) => {
  const [refs, setRefs] = useState<TRefs>(initialValue);

  const value: IRefsContext = {
    refs,
    setRefs,
  };

  return <RefsContext value={value}>{children}</RefsContext>;
};

export const useRefState = (): IRefsContext => {
  const context = useContext(RefsContext);

  if (!context) {
    throw new Error("useRefs must be used within a <RefsProvider>");
  }

  return context;
};
