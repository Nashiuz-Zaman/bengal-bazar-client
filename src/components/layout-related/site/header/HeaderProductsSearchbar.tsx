"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ButtonBtnTrans } from "@buttons/ButtonBtnTrans";
import { SearchIcon } from "@shared/icons/SearchIcon";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";

interface ISearchbarProps<T> {
  className?: string;
  showIcon?: boolean;
  modalClassName?: string;
  debounceDelay?: number;
  trigger?: (text: string) => void; // RTK query trigger function
  results?: T[];
  renderResult?: (
    item: T,
    index: number,
    onClick: () => void,
  ) => React.ReactNode;
}

export const HeaderProductsSearchbar = <T,>({
  className = "",
  showIcon = true,
  modalClassName = "",
  debounceDelay = 350,
  trigger,
  results: parentResults,
  renderResult,
}: ISearchbarProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [results, setResults] = useState<T[]>(parentResults || []);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useClickOutside(isResultModalOpen, (e) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      setIsResultModalOpen(false);
    }
  });

  // Debounced API call
  const [debouncedTrigger, cancelDebounced] = useDebouncedCallback(
    (text: string) => {
      trigger?.(text);
    },
    debounceDelay,
  );

  // Input change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);

      if (value.trim().length <= 2) {
        setIsResultModalOpen(false);
        setResults([]);
        return;
      }

      setIsResultModalOpen(true);
      debouncedTrigger(value);
    },
    [debouncedTrigger],
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    cancelDebounced();

    router.push("/products/s?search=" + searchText);
    setIsResultModalOpen(false);
    setResults([]);
  };

  // Sync with parent results if provided
  useEffect(() => {
    if (parentResults) setResults(parentResults);
  }, [parentResults]);

  useEffect(() => {
    if (searchText.length <= 2) {
      cancelDebounced();
      setIsResultModalOpen(false);
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-160 text-neutral-500  ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full rounded-full! overflow-hidden items-center text-inherit bg-neutral-100"
      >
        {showIcon && (
          <ButtonBtnTrans
            aria-label="Search products button"
            type="submit"
            className="text-inherit"
          >
            <SearchIcon className="px-4 2md:text-xl text-neutral-600" />
          </ButtonBtnTrans>
        )}

        <input
          type="text"
          name="searchText"
          value={searchText}
          placeholder="Search fresh groceries, meat and more..."
          onChange={handleChange}
          className="w-full py-2.5 focus:outline-none text-sm border-inherit bg-inherit"
        />
      </form>

      {isResultModalOpen && results && results.length > 0 && renderResult && (
        <div
          className={`absolute left-0 right-0 mt-1 bg-white shadow-lg border border-neutral-200 z-500 ${modalClassName}`}
        >
          <ul className="divide-y divide-neutral-100">
            {results.map((item, i) => (
              <li key={`key-${i}`}>
                {renderResult(item, i, () => {
                  setIsResultModalOpen(false);
                  setResults([]);
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
