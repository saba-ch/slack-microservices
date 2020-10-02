import React from 'react'

import { StyledButton } from './SubmitButtonStyles'

interface SubmitButtonProps {
  text: string
  type?: 'button' | 'submit'
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, type = 'submit' }) => (
  <StyledButton type={type}>
    {text}
  </StyledButton>
)

export default SubmitButton