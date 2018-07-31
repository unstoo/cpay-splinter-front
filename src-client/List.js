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
          <div style={style_header}>
            { feedback.id + ')'} 
            { ' ' + feedback['name'] + ' ' } 
            <a style={style_source} href={ feedback.url } target='_blank'>source</a>
            <span style={style_date}>{feedback.date}</span>
          </div>
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

const style_header = {
  display: 'flex'
}

const style_date = {
  marginLeft: 'auto',
  color: '#777'
}

const style_source = {
  marginLeft: '15px'
}
