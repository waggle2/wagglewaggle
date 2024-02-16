import axios from 'axios'
import local from 'next/font/local'

const SERVER_URL = 'https://www.wagglewaggle.site/api/v1'

const customAxios = axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const retryPlag = { isRetry: false }

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !retryPlag.isRetry) {
      retryPlag.isRetry = true
      try {
        await customAxios.get('/authentication/refresh-token')
        return customAxios(originalRequest)
      } catch (refreshError) {
        return onError(error.response.status, error.response.data.message)
      }
    }

    return onError(error.response.status, error.response.data.message)
  },
)

function onError(code: number, message: string) {
  const error = { code, message }
  throw error
}
export default customAxios
