import axios from 'axios'
export default () => {
  return axios.create({
    baseURL: process.env.BASE_URL,
    // withCredentials: true         // ! to set cookies from request calls (allow)
  })
}