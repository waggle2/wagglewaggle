import axios from 'axios'

const SERVER_URL = 'https://www.wagglewaggle.site/api/v1'

export default axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
