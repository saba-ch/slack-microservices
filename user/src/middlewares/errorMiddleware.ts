import { ArgumentValidationError, MiddlewareFn } from 'type-graphql'

const errorMiddleware: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next()
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      const errors: any = err.validationErrors.map((error) => ({
        field: error.value,
        message: error.constraints![Object.keys(error.constraints!)[0]]
      }))

      err.validationErrors = errors
    }
    throw err
  }
}

export default errorMiddleware