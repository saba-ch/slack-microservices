import UserContext from 'contexts/UserContext'
import React from 'react'

import { useUser } from 'services/useUserService'
import Router from 'Router'
import Notification from 'components/Notification'

const App: React.FC = () => {
  const { user, error } = useUser()

  return (
    <UserContext.Provider value={{ user }}>
      <Router />
      <Notification />
    </UserContext.Provider>
  )
}

export default App
