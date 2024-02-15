import axios from 'axios'
import api from './commonApi'

const SERVER_URL = 'https://www.wagglewaggle.site/api/v1'

const customAxios = axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response || !error.response.data) {
      return Promise.reject(error)
    }

    const { statusCode } = error.response.data
    if (statusCode === 401) {
      const response = await api.get('/authentication/refresh-token')
      const { statusCode: refreshTokenStatusCode } = response.data
      const { message: refreshTokenMessage } = response.data
      if (
        refreshTokenStatusCode === 401 &&
        refreshTokenMessage === 'Refresh token expired.'
      ) {
        window.location.href = '/login'
        return
      }
    }
    onError(
      error.response.data.statusCode ?? '',
      error.response.data.message ?? '',
    )
  },
)

function onError(code: number, message: string) {
  const error = { code, message }
  throw error
}

export default customAxios
