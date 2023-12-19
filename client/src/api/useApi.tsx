// useApi.ts
import React from "react";
import { ApiMethods } from "../enum/ApiMethods";
import axios from "axios";

interface Idata {
  success: boolean;
  message: string;
  data: any;
}

const useApi = (url: string, method: ApiMethods, requestBody: any) => {
  const [data, setData] = React.useState<Idata | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchApi = async () => {
    setLoading(true);

    try {
      const res = await axios[method](url, requestBody);
      setData(res.data);
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApi();
  }, [url, method, requestBody]);

  return { data, error, loading };
};

export default useApi;
