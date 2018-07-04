import React from 'react'
import ReactDOM from 'react-dom'

class SaveToFile extends React.Component { 
  constructor(props) {
    super(props)
  }

  download = e => {
    e.preventDefault()  
    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(this.props.data, null, 2)], {type: 'text/plain'})
    a.href = URL.createObjectURL(file)
    a.download = 'data.txt'
    a.click()
  }

  render() {
    return <div onClick={this.download} className='button'
      style={Object.assign({}, this.props.style)}>
      { this.props.children }
    </div>
  }
}

export default SaveToFile
