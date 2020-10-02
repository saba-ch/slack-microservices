import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { useSignUp } from 'services/useUserService'
import { authHelper } from 'helpers'
import { eventManager, validationUtils } from 'utils'

import TextInput from 'components/TextInput'
import SubmitButton from 'components/SubmitButton'

import { StyledContainer, StyledForm } from './SignUpStyles'

type FormData = {
  name: string
  organization: string
  email: string
  password: string
  repeatPassword?: string
}

const SignUp = () => {

  const signUp = useSignUp()
  const history = useHistory()

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (values: FormData) => {
    try {
      if (!(values.repeatPassword === values.password)) return eventManager.showNotificationFail('passwords do not match')
      delete values.repeatPassword

      const { data, errors } = await signUp({
        variables: {
          data: values
        }
      })

      if (errors?.length) return eventManager.showNotificationFail(errors[0].message)

      eventManager.showNotificationSuccess('Successfully signed up')
      authHelper.setToken(data.signUp.accessToken)
      history.push('/')
    } catch (err) {
      eventManager.showNotificationFail('Couldn\'t sign up')
    }
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label='Name'
          ref={register({ required: true })}
          name='name'
        />
        <TextInput
          label='Organization'
          ref={register({ required: true })}
          name='organization'
        />
        <TextInput
          label='Email'
          ref={register({ required: true, validate: { isEmail: validationUtils.isEmail } })}
          name='email'
        />
        <TextInput
          label='Password'
          ref={register({ required: true })}
          name='password'
          type='password'
        />
        <TextInput
          label='Repeat Password'
          ref={register({ required: true })}
          name='repeatPassword'
          type='password'
        />
        <SubmitButton text='Submit' type='submit' />
      </StyledForm>
    </StyledContainer>
  )
}

export default SignUp