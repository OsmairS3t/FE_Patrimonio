import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'http://192.168.1.93:3333',
  timeout: 99000,
  headers: {
    'Content-Type': 'application/json',
  },
})
