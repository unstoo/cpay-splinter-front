import React from 'react'
import ReactDOM from 'react-dom'

class Socket extends React.Component {
  constructor(props) {
    super(props)
    const token = document.cookie.split('=')[1]
    console.log(`ws://localhost:5005`)

    const socket = new WebSocket(`ws://localhost:5005`, token)

    socket.onopen = function() {
      console.log("Соединение установлено.")
    }
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('WS:Соединение закрыто чисто')
      } else {
        console.log('WS:Обрыв соединения') // например, "убит" процесс сервера
      }

      console.log('WS:Код: ' + event.code + ' причина: ' + event.reason)
    }
    
    socket.onmessage = (event) => {
      console.log('WS:Received Data: ' + event.data)
      let data = {}

      try {
        data = JSON.parse(event.data)
      } catch (e) {
        console.error('Couldn\'t parse JSON from WebSocket data.')
        return
      }

      this.router(data)
    }
    
    socket.onerror = function(error) {
      console.log('WS:Ошибка: ' + JSON.stringify(error))
    }
  }

  router = ({ action, author, body }) => {
    const handler = this.props.router[action]
    if (handler) {
      handler({ author, body })
    }
  }

  render() {
    return ''
  }
}

export default Socket
