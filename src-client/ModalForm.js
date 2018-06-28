import React from 'react'
import ReactDOM from 'react-dom'

class ModalForm extends React.Component { 
  constructor(props) {
    super(props)
  }

  onSubmit = e => {
    e.preventDefault()
    
    this.props.handlers.onSubmit(e)
    this.setState((prevState, props) => {
      return { isModalHidden: true }
    })
  }

  render() {

    return <div style={this.props.visible ? style_visible : style_hidden}>
      <form onSubmit={this.onSubmit}>
        
        <br/><label>Ваше имя? <input name='name' type='text'/></label>
        <br/><label>Линк на live chat? <input name='url' type='text'/></label>
        <br/><label>Страна обратившегося? <input name='country' type='text'/></label>
        <br/><label>Комментарий? <input name='notes' type='text'/></label>
        <br/><label>Метки? <input name='tags' type='text'/></label>
        <br/>
        <hr/>
        <button className='button'>Add New Feedback</button>
      </form>
    </div>
  }
}

export default ModalForm

const style_visible = {
  position: 'fixed',
  background: 'white',
  top: '100px',
  left: '320px',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}

const style_hidden = {
  position: 'fixed',
  background: 'white',
  top: '-1000px',
  left: '320px',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}