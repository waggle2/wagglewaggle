import axios, { AxiosInstance } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export default function useAxiosWithAuth(
  router: AppRouterInstance,
): AxiosInstance {
  const SERVER_URL = 'https://www.wagglewaggle.site/api/v1'
  const createAxiosInstance = () => {
    return axios.create({
      baseURL: SERVER_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  }

  let axiosInstance = createAxiosInstance()
  let retryState = false
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && !retryState) {
        retryState = true
        try {
          await axiosInstance.get('/authentication/refresh-token')
          retryState = false
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}
