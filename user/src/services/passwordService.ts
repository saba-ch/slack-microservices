import bcrypt from 'bcrypt'

const hash = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

const compare = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword)
}

export default {
  hash,
  compare
}