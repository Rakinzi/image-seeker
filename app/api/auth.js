import apiClient from "./client";


const loginUrl = '/auth/login'
const registerUrl = '/auth/register'
const login = (email, password) => apiClient.post(loginUrl, { email, password })
const register = (email, username, password) => apiClient.post(registerUrl, { email, username, password })

export default {
    login,
    register
}