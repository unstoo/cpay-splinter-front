import React from 'react'
import ReactDOM from 'react-dom'
import Tags from './Tags'

class List extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }    
  }

  render() {
    const feedbacksList = this.props.data.map((feedback, index) => {
        return <div key={ 'feedback-' + feedback.id } style={styles} className='feedback-item'>
          { feedback.id + ')'} 
          { ' ' + feedback['name'] + ' ' } 
          <a href={ feedback.url }>chat</a>
          { ' :' + feedback.date}
          <br/>
          <hr/>
          <div>{ feedback.notes }</div>
          <Tags 
            handlers={{ addTag: this.props.handlers.addTag, removeTag: this.props.handlers.removeTag }} 
            data={ feedback.tags }
            feedbackid={ feedback.id } />

          {/* <button style={styles_remove} data-feedbackindex={ feedback.id } 
            onClick={this.props.handlers.removeFeedback} className='button'>Remove</button> */}
        </div>
    })

    return <div className='list-component'>
      { feedbacksList }
    </div>
  }
}

export default List

const styles = {
  marginBottom: '40px',
  position: 'relative'
}

const styles_remove = {
  position: 'absolute',
  right: '15px',
  bottom: '15px',
  zIndex: '2'
}
