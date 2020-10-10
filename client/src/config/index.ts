
interface Config {
  apiUrl?: string
}

let config: Config = {}

switch (process.env.REACT_APP_STAGE!) {
  case 'staging':
    config = {
      apiUrl: 'http://slack.website/graphql'
    }
    break
  case 'production':
    config = {
      apiUrl: 'http://slack.dev/graphql'
    }
    break
  case 'development':
    config = {
      apiUrl: 'http://slack.website/graphql'
    }
    break
  default:
    config = {
      apiUrl: 'http://slack.website/graphql'
    }
}

export default config