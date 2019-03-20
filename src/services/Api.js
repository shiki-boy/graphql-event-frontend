import axios from 'axios'

if (process.env.DEPLOYED !== "1") {
  export default () => {
    return axios.create({
      baseURL: 'http://localhost:3000',
      // withCredentials: true         // ! to set cookies from request calls (allow)
    })
  }
}
else{
  export default () => {
    return axios.create({
      baseURL: process.env.BASE_URL,
      // withCredentials: true         // ! to set cookies from request calls (allow)
    })
  }
}