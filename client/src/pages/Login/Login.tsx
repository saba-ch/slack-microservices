import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { useSignIn } from 'services/useUserService'
import { validationUtils, eventManager } from 'utils'
import { authHelper } from 'helpers'

import { StyledContainer } from './LoginStyles'

type FormData = {
  email: string;
  password: string;
  organization: string;
}

const Login: React.FC = () => {
  const signIn = useSignIn()

  const history = useHistory()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (values: FormData) => {
    try {
      const { data, errors } = await signIn({ variables: { data: values } })

      if (errors?.length) eventManager.showNotificationFail(errors[0].message)

      eventManager.showNotificationSuccess('Successfully signed in')
      authHelper.setToken(data.signIn.accessToken)
      history.push('/')
    } catch (err) {
      eventManager.showNotificationFail('Couldn\'t sign in')
    }

  }
  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            required: true,
            validate: { isEmail: validationUtils.isEmail }
          })}
          type='text'
          name='email'
        />
        <input
          ref={register({ required: true })}
          name='organization'
          type='text'
        />
        <input
          ref={register({ required: true })}
          name='password'
          type='password'
        />
        <button type='submit'>Submit</button>
      </form>
    </StyledContainer>
  )
}

export default Login
