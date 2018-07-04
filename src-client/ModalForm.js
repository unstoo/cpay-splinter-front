import React from 'react'
import ReactDOM from 'react-dom'

class ModalForm extends React.Component { 
  constructor(props) {
    super(props)
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.handlers.onSubmit(e)
  }

  render() {
    const date = new Date()
    const dateAsValue = date.toJSON().split('T')[0]
    console.log(dateAsValue);
    
    return <div style={this.props.visible ? style_visible : style_hidden}>
      <form onSubmit={this.onSubmit}>

        <br/><label>Линк на live chat? <input name='url' type='text'/></label>
        <br/><label>Страна обратившегося? <input name='country' type='text'/></label>
        <br/><label>Комментарий? <input name='notes' type='text'/></label>
        <br/><label>Метки? <input name='tags' type='text'/></label>
        <br/><input name='date' type='date' value={dateAsValue} hidden readonly/>
        <hr/>
        <button className='button'>Add New Feedback</button>
      </form>
    </div>
  }
}

export default ModalForm

const style_visible = {
  top: '100px',
  position: 'fixed',
  background: 'white',
  left: '320px',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}

const style_hidden = {
  top: '-1000px',
  position: 'fixed',
  background: 'white',
  left: '320px',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}
