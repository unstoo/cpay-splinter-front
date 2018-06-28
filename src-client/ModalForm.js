import React from 'react'
import ReactDOM from 'react-dom'

class ModalForm extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      isModalHidden: true
    }
  }

  onSubmit = e => {
    e.preventDefault()
    
    this.props.handlers.onSubmit(e)
    this.setState((prevState, props) => {
      return { isModalHidden: true }
    })
  }

  render() {
    return <div>
      <form onSubmit={this.onSubmit}>
        
        <br/><label>Ваше имя? <input name='name' type='text'/></label>
        <br/><label>Линк на live chat? <input name='url' type='text'/></label>
        <br/><label>Страна обратившегося? <input name='country' type='text'/></label>
        <br/><label>Комментарий? <input name='notes' type='text'/></label>
        <br/><label>Метки? <input name='tags' type='text'/></label>
        <br/>
        <button>Add New Feedback</button>
      </form>
    </div>
  }
}

export default ModalForm
