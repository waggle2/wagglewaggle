import axios from 'axios'

const customAxios = axios.create({
  baseURL:
    'http://ec2-43-201-195-164.ap-northeast-2.compute.amazonaws.com/api/v1',
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
