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
    const listOfFeedback = this.props.data.map((feedback, index) => {
        return <div key={ 'feedback-' + feedback.id }>
          { feedback.id }) 
          {' '}{ feedback['name'] } 
          {' '}<a href={ feedback.url }>Intercom chat</a>
          <div>{ feedback.notes }</div>
          <Tags 
            handlers={{ addTag: this.props.handlers.addTag, removeTag: this.props.handlers.removeTag }} 
            data={ feedback.tags }
            index={ feedback.id } />
          <hr/>
        </div>
    })

    return <div className='list-component'>
      { listOfFeedback }
    </div>
  }
}

export default List
