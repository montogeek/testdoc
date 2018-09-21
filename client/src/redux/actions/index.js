import { LOGIN_USER } from '../constants'

export function loginUser(email, password) {
  return {
    type: LOGIN_USER,
    payload: { email, password }
  }
}