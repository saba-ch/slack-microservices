import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { eventManager } from 'utils'

import { StyledContainer, StyledText } from './NotificationStyles'

type NotificationState = {
  shown: boolean,
  message: string,
  error: boolean
}

const Notification: React.FC = () => {
  const [notification, setNotification] = useState<NotificationState>({
    shown: false,
    message: '',
    error: false,
  })

  useEffect(() => {
    let timerId: number = 0
    // tslint:disable-next-line: no-shadowed-variable
    eventManager.addListener('notification', (message: string, type: string, duration: number) => {
      clearTimeout(timerId)

      setNotification({ message, shown: true, error: type === 'error' })

      timerId = setTimeout(() => setNotification({ message: '', shown: false, error: false }), duration)
    })
  }, [])

  const { shown, message, error } = notification

  return ReactDOM.createPortal(
    (
      <StyledContainer
        error={!!error}
        shown={shown}
      >
        <StyledText>
          {message}
        </StyledText>
      </StyledContainer>
    ),
    document.getElementById('root')!
  )
}

export default Notification