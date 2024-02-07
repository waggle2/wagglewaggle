import { AxiosRequestConfig } from 'axios'
import axiosInstance from './config'

const api = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      console.error('Error getting data:', error)
    }
  },
  delete: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.delete(url, config)
      return response.data
    } catch (error) {
      console.error('Error deleteing data:', error)
    }
  },
  post: async (url: string, data: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      console.error('Error posting data:', error)
    }
  },
  patch: async (url: string, data: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.patch(url, data, config)
      return response.data
    } catch (error) {
      console.error('Error patching data:', error)
    }
  },
  put: async (url: string, data: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.put(url, data, config)
      return response.data
    } catch (error) {
      console.error('Error putting data:', error)
    }
  },
}

export default api
