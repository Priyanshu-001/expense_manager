import axios from 'axios'
import {getJWT} from './getJWT'
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost/api/':'/api'

const Axios = axios.create({
      baseURL: BASE_URL,
      headers:{
        "Content-Type": "application/json",
      }
    })

Axios.interceptors.request.use(config=>{

    config.headers['Authorization'] = getJWT()
    return config
  },
  err=>{ return Promise.reject(err)}
  )
export default Axios