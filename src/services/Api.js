import axios from 'axios'
export default () => {
  return axios.create({
    baseURL:process.env.VUE_APP_API_URL,
    // withCredentials: true         // ! to set cookies from request calls (allow)
  })
}