import userService from './userService'

const mutations = {
  signUp: userService.signUp,
  signIn: userService.signIn,
}

const queries = {
  user: userService.currentUser
}

export default {
  Mutation: mutations,
  Query: queries
}