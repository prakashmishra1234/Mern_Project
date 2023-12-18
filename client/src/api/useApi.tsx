import React from "react";
import { ApiMethods } from "../enum/ApiMethods";
import axios from "axios";

interface Idata {
  success: boolean;
  message: string;
  data: any;
}

const useApi = (url: string, method: ApiMethods, requestBody: any) => {
  const [data, setdata] = React.useState<Idata>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const fetchApi = async () => {
    setLoading(true);

    axios[method](url, requestBody)
      .then((res: any) => {
        setdata(res.data);
      })
      .catch((err: any) => {
        console.log(err);
        setError(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    fetchApi();
  }, []);

  return { data, error, loading };
};

export default useApi;
