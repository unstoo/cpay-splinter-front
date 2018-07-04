// invisible component
import React from 'react'
// what React DOM does?
import ReactDOM from 'react-dom'

// what it does
// 1 creates a websocket client
// 2 provides means for debbuging
// 3 provides a websocket configuration

class Socket extends React.Component {
  constructor(props) {
    super(props)
    const token = document.cookie.split('=')[1]
    console.log(`ws://localhost:5005`)
    const socket = new WebSocket(`ws://localhost:5005`, token)
    socket.onopen = function() {
      console.log("Соединение установлено.");
    }
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('WS:Соединение закрыто чисто');
      } else {
        console.log('WS:Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log('WS:Код: ' + event.code + ' причина: ' + event.reason)
    }
    
    socket.onmessage = function(event) {
      console.log("WS:Получены данные::: " + event.data)
      // tut ruter
    }
    
    socket.onerror = function(error) {
      console.log("WS:Ошибка " + error.message)
    }
    this.state = {
      debuggerLevel: 0
    }
  }

  onClick = e => {
    e.preventDefault()
  }

  debugger = options => {
  }

  render() {
    return <div>
    </div>
  }
}

export default Socket