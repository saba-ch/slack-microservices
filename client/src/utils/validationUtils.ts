import validator from 'validator'

const isEmail = (email?: string) => {
  if (!email) return undefined
  if (!validator.isEmail(email)) return 'Email is required'
  return undefined
}

export default {
  isEmail,
}