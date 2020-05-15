import axios from 'axios'

import { endpointApi } from '@/environment/environment'

const config = {
  baseURL: endpointApi,
}

const axiosInstance = axios.create(config)

export default axiosInstance
