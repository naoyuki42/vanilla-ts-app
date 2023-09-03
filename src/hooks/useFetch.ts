import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const useGetAPI = async <T>(
  url: string,
  option?: AxiosRequestConfig
): Promise<T> => {
  return new Promise((resolve, reject): void => {
    axios
      .get(url, option)
      .then(({ data }: AxiosResponse<T>): void => resolve(data))
      .catch((e: AxiosError<{ error: string }>): void => {
        reject(e);
      });
  });
};
