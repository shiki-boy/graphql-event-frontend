  import axios from 'axios'

  var baseURL
  console.log(window.location.host)
  if (!window.location.host.includes('.com')) {
    baseURL = "http://localhost:3000"
  } else {
    baseURL = "https://graphql-event-backend.herokuapp.com"
  }
  export default () => {
    return axios.create({
      baseURL,
      // withCredentials: true         // ! to set cookies from request calls (allow)
    })
  }