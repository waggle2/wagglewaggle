import { AxiosRequestConfig } from 'axios'
import axiosInstance from './config'

const api = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  },
  delete: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.delete(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  },
  post: async (url: string, data: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  },
  patch: async (url: string, data: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.patch(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  },
  put: async (url: string, data: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.put(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default api
