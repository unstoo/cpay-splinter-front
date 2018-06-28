import React from 'react'
import ReactDOM from 'react-dom'
import Tags from './Tags'

class Toggler extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  onTagClick = e => {
    this.setState((prevState, prosp) => {
      this.props.handlers.toggle()
      return { active: !prevState.active }
    }) 
  }

  render() {
    let toggler_track_style = toggler_track
      , toggler_handler_style = toggler_handler

    if (this.state.active) {
      toggler_track_style = toggler_track__active
      toggler_handler_style = toggler_handler__active
    }

    return <div style={Object.assign({display: 'flex', alignItems: 'center'}, this.props.style)}>
      <div style={toggler_track_style} onClick={this.onTagClick}>
        <div style={toggler_handler_style}></div>
      </div>
      <div style={{marginLeft: '5px'}}>{this.props.children}</div>
    </div>
  }
}

const toggler_track   = {
  width: '50px',
  height: '30px',
  borderRadius: '30px',
  background: 'silver',
  position: 'relative',
  cursor: 'pointer'
}

const toggler_handler = {
  width: '24px',
  height: '24px',
  background: 'white',
  border: '1px solid white',
  borderRadius: '50%',
  position: 'absolute',
  left: '4px',
  top: '3px',
  transitionProperty: 'left',
  transitionDuration: '0.3s'
}

const toggler_handler__active = Object.assign({}, toggler_handler,
  {
    left: '22px'
  })
  
const toggler_track__active = Object.assign({}, toggler_track,
  {
    background: 'dodgerblue',
  })
    
    export default Toggler
