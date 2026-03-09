import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { withRetry } from "@/utils/withRetry";

interface IAxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
}

export const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<IAxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    // We define the actual execution logic as a separate async function
    const executeRequest = async () => {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
      });
      return result.data;
    };

    try {
      const data = await withRetry(executeRequest, 3, 1200);

      return { data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
