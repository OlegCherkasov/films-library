const axios = require('axios');

const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: process.env.VUE_APP_KEY,
  }
})
export default http;