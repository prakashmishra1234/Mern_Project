import React from "react";
import { ApiMethods } from "../enum/ApiMethods";
import axios, { AxiosRequestConfig } from "axios";

interface Idata {
  success: boolean;
  message: string;
  data: any;
}

const useApi = (
  url: string,
  method: ApiMethods,
  params?: Record<string, any>,
  requestBody?: any,
  config?: AxiosRequestConfig
) => {
  const [data, setData] = React.useState<Idata | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const paramsRef = React.useRef(params);
  const requestBodyRef = React.useRef(requestBody);
  const configRef = React.useRef(config);

  React.useEffect(() => {
    paramsRef.current = params;
    requestBodyRef.current = requestBody;
    configRef.current = config;
  }, [params, requestBody, config]);

  const fetchApi = React.useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios({
          url,
          method,
          params: paramsRef.current,
          data: requestBodyRef.current,
          signal,
          ...configRef.current,
        });
        setData(res.data);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.log(err);
          setError(err.response?.data?.message ?? "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  const callApi = React.useCallback(() => {
    const controller = new AbortController();
    fetchApi(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchApi]);

  return { data, error, loading, callApi };
};

export default useApi;
