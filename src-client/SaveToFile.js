import React from 'react'
import ReactDOM from 'react-dom'

class SaveToFile extends React.Component { 
  constructor(props) {
    super(props)
  }

  download = e => {
    e.preventDefault()  
    debugger
    const a = document.createElement("a")
    const file = new Blob([JSON.stringify(this.props.data, null, 2)], {type: 'text/plain'})
    a.href = URL.createObjectURL(file)
    a.download = 'data.txt'
    a.click()
  }

  render() {
    return <div onClick={this.download}>
      <a href='#'>{ this.props.children }</a>
    </div>
  }
}

export default SaveToFile
