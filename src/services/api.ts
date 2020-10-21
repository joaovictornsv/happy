import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happy-deploy-jv.herokuapp.com/'
})

export default api;