import { isBrowser } from '@lib/utils/platform-checker'
import axios from 'axios'

/**
 * # apiConnection
 *
 * the connection into the backend
 * using the rest api client
 */
const apiConnection = axios.create({
  baseURL: isBrowser
    ? process.env.BACKEND_API_URL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL,
  timeout: 5000,
})

export default apiConnection
