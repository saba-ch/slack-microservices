import React, { ForwardRefRenderFunction } from 'react'

import {
  StyledContainer,
  StyledInput,
  StyledLabel
} from './TextInputStyles'

interface TextInputProps {
  label?: string
  type?: string
  name: string
  placeholder?: string
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
}, ref) => {

  return (
    <StyledContainer>
      {label && (<StyledLabel htmlFor={name}>{label}</StyledLabel>)}
      <StyledInput ref={ref} name={name} type={type} placeholder={placeholder} />
    </StyledContainer>
  )
}

export default React.forwardRef(TextInput)