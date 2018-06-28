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

    reader.readAsText(e.target.files[0])
  }

  render() {
    return <div style={Object.assign({}, this.props.style)}>
      <form>
        <label className='button' htmlFor="upload-data">
          {this.props.children}
        </label>
        <input onChange={this.load} type="file" className='hidden-input' id="upload-data" />
      </form>
    </div>
  }
}

export default LoadFileContent
