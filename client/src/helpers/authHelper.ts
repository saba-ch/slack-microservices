
const getToken = () => localStorage.getItem('accessToken')

const setToken = (token: string) => localStorage.setItem('accessToken', token)

export default {
  getToken,
  setToken
}