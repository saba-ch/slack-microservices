import React, { useContext } from 'react'

import UserContext from 'contexts/UserContext'

import { StyledContainer } from './HomeStyles'

const Home = () => {
  const { user } = useContext(UserContext)

  return (
    <StyledContainer>
      Hello {user!.name}
    </StyledContainer>
  )
}

export default Home