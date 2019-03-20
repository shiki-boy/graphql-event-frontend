import axios from 'axios'
export default () => {
  return axios.create({
    baseURL: `${process.env.BASE_URL}`||"http://localhost:3000",
    // withCredentials: true         // ! to set cookies from request calls (allow)
  })
}