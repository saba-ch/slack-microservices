import React from 'react'

import { IUserContext } from 'types/user'

export default React.createContext<IUserContext>({ user: undefined })