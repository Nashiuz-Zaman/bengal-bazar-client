"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import isEqual from "lodash/isEqual";

import {
  getQueryParamsFromSearchParams,
  buildUrlWithParams,
} from "@/utils/queryParams";
import { cleanObject } from "@/utils/cleanObject";
import {
  compressObjectToBase64Url,
  decompressBase64UrlToObject,
} from "@/utils/compression";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

// API & Types
import {
  useGetProjectsAdminQuery,
  useGetProjectsPublicQuery,
} from "@/libs/redux/api/project.api";
import {
  IMultipleResourceQueryParams,
  IQueryMeta,
  TProject,
  TProjectPopulated,
  TStringKeyOf,
} from "@/types";

interface IUseProjectQueriesArgs {
  isPrivate?: boolean;
  limit?: number;
  extraLimitFields?: TStringKeyOf<TProject>[];
  defaultSort?: string;
  initialData?: TProjectPopulated[];
  initialQueryMeta?: IQueryMeta;
}

export interface IProjectQueriesForm {
  page: number;
  sort: string;
  search: string;
  technologies: TProject["technologies"];
}

export const useProjectQueries = ({
  isPrivate = false,
  limit = 20,
  extraLimitFields = [],
  defaultSort = "-createdAt",
  initialData = [],
  initialQueryMeta,
}: IUseProjectQueriesArgs = {}) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const isClient = typeof document !== "undefined";
  const [hasInteracted, setHasInteracted] = useState(false);

  // 1. Extract values from URL (The Source of Truth)
  const formParamsFromUrl = useMemo(() => {
    const rawQueryParams = getQueryParamsFromSearchParams(searchParams, [
      "page",
      "search",
      "q",
    ]);
    const q = typeof rawQueryParams.q === "string" ? rawQueryParams.q : "";
    let decompressed;
    if (q) {
      decompressed = decompressBase64UrlToObject<{
        technologies?: TProject["technologies"];
        sort?: string;
      }>(q);
    }

    return {
      page: Number(rawQueryParams.page) || 1,
      search: (rawQueryParams.search as string) || "",
      technologies: decompressed?.technologies ?? [],
      sort: decompressed?.sort ?? defaultSort,
    };
  }, [searchParams, defaultSort]);

  // 2. Initialize RHF
  const form = useForm<IProjectQueriesForm>({
    defaultValues: formParamsFromUrl,
  });

  // 3. SYNC: If URL changes (e.g. back button), update form fields
  useEffect(() => {
    const currentValues = form.getValues();

    if (!isEqual(currentValues, formParamsFromUrl)) {
      form.reset(formParamsFromUrl);
    }
  }, [formParamsFromUrl, form]);

  // 4. URL Update Logic
  const pushToUrl = (values: typeof formParamsFromUrl) => {
    console.log(values);
    setHasInteracted(true);
    const urlParams = cleanObject({
      page: values.page,
      search: values.search,
      q: compressObjectToBase64Url({
        technologies: values.technologies,
        sort: values.sort,
      }),
    }) as IMultipleResourceQueryParams;

    const newUrl = buildUrlWithParams(path, urlParams);
    router.replace(newUrl, { scroll: false });
  };

  // 5. Auto-Submit/Debounce Logic
  const [debouncedPush] = useDebouncedCallback(pushToUrl, 500);

  // This handles the "Auto-Submit" behavior
  const handleFieldChange = (fieldName: string) => {
    const currentValues = form.getValues();

    // If search is typing, use debounce. If checkbox/sort clicked, immediate push.
    if (fieldName === "search") {
      debouncedPush({ ...currentValues, page: 1 });
    } else {
      pushToUrl({ ...currentValues, page: 1 });
    }
  };

  // 6. Manual Submit Logic
  const handleManualSubmit = form.handleSubmit((data) => {
    pushToUrl({ ...data, page: 1 });
  });

  // 7. API Query Params
  const apiQueryParams = useMemo(() => {
    const limitFields: TStringKeyOf<TProject>[] = [
      "_id",
      "thumbnail",
      "extraUrls",
      "liveUrl",
      "slug",
      "title",
      ...extraLimitFields,
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { technologies: _, sort: __, ...baseParams } = formParamsFromUrl;

    return cleanObject({
      ...baseParams,
      limit,
      q: compressObjectToBase64Url({
        technologies: formParamsFromUrl.technologies,
        sort: formParamsFromUrl.sort,
      }),
      limitFields: limitFields.join(","),
    }) as IMultipleResourceQueryParams;
  }, [formParamsFromUrl, limit, extraLimitFields]);

  // We skip if:
  // 1. We are on the server (isClient is false)
  // 2. We have initialData AND the user hasn't interacted yet.
  const shouldSkip = !isClient || (!hasInteracted && !!initialData.length);

  const publicQuery = useGetProjectsPublicQuery(apiQueryParams, {
    skip: shouldSkip || isPrivate,
  });
  const adminQuery = useGetProjectsAdminQuery(apiQueryParams, {
    skip: shouldSkip || !isPrivate,
  });

  const query = isPrivate ? adminQuery : publicQuery;
  const projectsFromClientRequest = query?.data?.data?.projects;

  const projects = hasInteracted
    ? (projectsFromClientRequest ?? [])
    : (projectsFromClientRequest ?? initialData);
  return {
    form,
    handleFieldChange,
    handleManualSubmit,
    changePage: (page: number) => {
      setHasInteracted(true); // Ensure interaction is tracked on page change too
      pushToUrl({ ...form.getValues(), page });
    },
    projects,
    queryMeta: (query?.data?.data?.queryMeta ?? initialQueryMeta) as IQueryMeta,
    isFetching: query?.isFetching,
    refetch: query.refetch,
  };
};
