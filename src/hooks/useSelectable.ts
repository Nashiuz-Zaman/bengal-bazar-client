"use client";

import { useMemo, useState } from "react";

export const useSelectable = <T extends Record<string, any>, K extends keyof T>(
  data: T[] = [],
  keyField: K,
) => {
  const [selected, setSelected] = useState<T[K][]>([]);
  const [single, setSingle] = useState<T[K]>();

  const dataKeys = useMemo(
    () => data.map((item) => item[keyField]),
    [data, keyField],
  );

  // Always derive a valid selected list
  const validSelected = useMemo(
    () => selected.filter((id) => dataKeys.includes(id)),
    [selected, dataKeys],
  );

  const checkIfSelected = (item: T) => validSelected.includes(item[keyField]);

  const isAllSelected =
    validSelected.length > 0 && validSelected.length === dataKeys.length;

  const toggleSelectOne = (item: T) => {
    const id = item[keyField];

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelected(validSelected.length === dataKeys.length ? [] : dataKeys);
  };

  const removeSingle = () => setSingle(undefined);

  const selectedData = useMemo(
    () => data.filter((item) => validSelected.includes(item[keyField])),
    [data, validSelected, keyField],
  );

  return {
    selected: validSelected,
    setSelected,
    selectedData,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
    single,
    setSingle,
    removeSingle,
  };
};

export type TUseSelectableReturn<
  T extends Record<string, any>,
  K extends keyof T,
> = ReturnType<typeof useSelectable<T, K>>;
