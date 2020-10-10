
interface Config {
  apiUrl?: string
}

let config: Config = {}

switch (process.env.REACT_APP_STAGE!) {
  case 'staging':
    config = {
      apiUrl: 'https://slack.dev/api/users/graphql'
    }
    break
  case 'production':
    config = {
      apiUrl: 'https://slack.dev/api/users/graphql'
    }
    break
  case 'development':
    config = {
      apiUrl: 'http://slack.website/api/users/graphql'
    }
    break
  default:
    config = {
      apiUrl: 'https://slack.dev/api/users/graphql'
    }
}

export default config