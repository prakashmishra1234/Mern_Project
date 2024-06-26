import axios from "axios";
import { ApiMethods } from "../enum/ApiMethods";

interface Idata {
  success: boolean;
  message: string;
  data?: any;
}

export const getDataFromApi = async (
  url: string,
  method: ApiMethods,
  params?: Record<string, any>,
  requestBody?: any
) => {
  let data: Idata = {
    success: false,
    message: "",
    data: null,
  };
  try {
    const res = await axios({
      url,
      method,
      params: params,
      data: requestBody,
    });
    console.log("API Response : ", res);
    data = {
      data: res.data.data,
      message: res.data.message,
      success: res.data.success,
    };
  } catch (err: any) {
    console.error("API Error : ", err);
    data = {
      data: null,
      message: err.response.data.message,
      success: err.response.data.success,
    };
  }
  return data;
};
