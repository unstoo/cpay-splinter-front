import React from 'react'
import ReactDOM from 'react-dom'



class C extends React.Component { 
  constructor(props) {
    super(props)
  }

  onClick = e => {
    e.preventDefault()   
  }

  render() {
    let childToRender = this.props.children[1]

    if (this.props.active)
      childToRender = this.props.children[0]

    return <div>
      {childToRender}
    </div>
  }
}

    export default C
