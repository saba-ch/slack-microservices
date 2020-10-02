import eventEmitter from './eventEmitter'

class EventManager {
  showNotificationSuccess(message: string, duration: number = 1000) {
    return eventEmitter.emit('notification', message, 'success', duration)
  }

  showNotificationFail(message: string, duration: number = 1000) {
    return eventEmitter.emit('notification', message, 'error', duration)
  }

  // tslint:disable-next-line: ban-types
  addListener(eventType: string, listener: Function) {
    return eventEmitter.addListener(eventType, listener)
  }
}

export default new EventManager()