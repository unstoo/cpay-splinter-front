import React from 'react'
import ReactDOM from 'react-dom'

class LoadFileContent extends React.Component { 
  constructor(props) {
    super(props)
  }

  load = e => {
    e.preventDefault()
    
    var reader = new FileReader()
    reader.onload = (e) => {
      const contents = JSON.parse(e.target.result)
      this.props.handlers.dataLoaded(contents)
    }

    reader.readAsText(e.target[0].files[0])
  }

  render() {
    return <div>
      <form onSubmit={this.load}>
        <input type="file" />  
        <button>{this.props.children}</button>
      </form>
    </div>
  }
}

export default LoadFileContent
