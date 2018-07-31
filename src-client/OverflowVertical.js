import React from 'react'
import ReactDOM from 'react-dom'

class OverflowVertical extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = e => {
    e.preventDefault()
  }

  render() {

    return <div style={outter}>
      <div style={inner}>
        { this.props.children}
      </div>
    </div>
  }
}

export default OverflowVertical

const outter = {
  overflowY: 'auto',
  heigth: '50vh'
}

const inner = {
  maxHeight: '50vh'
}