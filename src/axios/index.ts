import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

// import { ProblemsType } from "../types/ProblemsTypes";
// import { Problem } from "../types/ServerResponce";
import { User } from "../types/UserTypes";
import { LoginResponce } from "./requests/AuthRequests";
// export const API_URL: string = "http://localhost:5000/api";
// export const STATIC_URL: string = "http://localhost:5000/";

export const API_URL = "http://192.168.0.190:5000/api";
export const STATIC_URL = "http://192.168.0.190:5000/";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const myConf: AxiosRequestConfig & { _isRetry?: boolean } = error.config;
  const originalRequest = myConf;
  // error.response && error.response.status === 401 &&//todo
  if (error.config && !myConf._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
      const auth: LoginResponce = response.data;
      const user: User = auth.data as User;
      localStorage.setItem("token", user.accessToken);

      if (typeof originalRequest.data === "string") {
        originalRequest.data = JSON.parse(originalRequest.data);
      }

      return PROTECTED_API.request(originalRequest);
    } catch (error) {
      console.error(error);
    }
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
const PROTECTED_API = setupInterceptorsTo(
  axios.create({
    withCredentials: true,
    baseURL: API_URL,
  })
);
export default PROTECTED_API;
