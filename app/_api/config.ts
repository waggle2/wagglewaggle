import axios from 'axios'

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
  (error) =>
    onError(
      error.response.data.statusCode ?? '',
      error.response.data.message ?? '',
    ),
)

function onError(code: number, message: string) {
  const error = { code, message }
  throw error
}

export default customAxios
