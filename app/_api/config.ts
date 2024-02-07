import axios from 'axios'

export default axios.create({
  baseURL:
    'http://ec2-43-201-195-164.ap-northeast-2.compute.amazonaws.com/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
