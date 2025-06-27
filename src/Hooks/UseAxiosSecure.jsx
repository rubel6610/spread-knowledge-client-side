
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Unauthorized",
            text: "Session expired. Please login again.",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            logout()
              .then(() => {
                localStorage.removeItem("token");
              })
              .catch((err) => console.error(err));
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return axiosInstance;
};

export default useAxiosSecure;
