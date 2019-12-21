import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:4000/`
    // baseURL: `http://192.168.1.171:4000/`
  })
