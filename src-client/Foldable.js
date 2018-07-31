import React from 'react'
import ReactDOM from 'react-dom'

class Foldable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folded: this.props.folded || true
    }
  }

  onClick = e => {
    e.preventDefault()
    
    this.setState((prevState, props) => {
      return { folded: !prevState.folded}
    })
  }

  render() {
    const styleToApply = this.state.folded ? style_folded : style_unfolded
    const buttonLabel = this.state.folded ? 'Unfold' : 'Fold'
    return <div>
      <div style={style_header}>
        <button onClick={this.onClick} className='button'>{ buttonLabel }</button>

        {this.props.label && <strong style={style_label}>{this.props.label}</strong> }

      </div>
      
      <div style={styleToApply}>
        { this.props.children }
      </div>
    </div>
  }
}

export default Foldable

const style_unfolded = {
  height: 'auto',
  opacity: '1',
  zIndex: 'auto',
  marginLeft: '15px',
  position: 'relative'
}
const style_folded = {
  height: '0',
  opacity: '0',
  zIndex: '-1',
  position: 'fixed',
}

const style_bar = {
  width: '100%',
  height: '1px',
  borderTop: '1px solid dodgerblue',
  margin: '0 15px',
  marginTop: '3px',
  opacity: '0.8'
}

const style_header = {
  display: 'flex',
  alignItems: '',
  margin: '15px 0'
}

const style_label = {
  display: 'block',
  paddingTop: '3px',
  marginLeft: '10px'
}