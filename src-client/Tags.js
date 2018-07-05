import React from 'react'
import ReactDOM from 'react-dom'

class Tags extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      tags: []
    }
  }

  removeTag = (e) => {
    e.preventDefault()
    const tagName = e.target.dataset.tagname
    const feedbackId = this.props.feedbackid
    this.props.handlers.removeTag({
      feedbackId,
      tagName
    })
  }

  addTag = (e) => {
    e.preventDefault()

    const newTagName = e.target[0].value
    e.target[0].value = ''

    if (newTagName === '') return

    this.props.handlers.addTag({
      feedbackId: this.props.feedbackid,
      tagName: newTagName
    })
  }

  render() {

    const tags = this.props.data
    const tagNames = Object.keys(tags)


    const chipTags = tagNames.map(tag => {
      if (!tag) return

      return <span key={tag} style={chip_tag}>
        <span>{ tag + ' ' }</span>
        <button onClick={this.removeTag} data-tagname={tag} 
          className='button' style={x_button_style}>
            <span style={x_style} data-tagname={tag}>x</span>
        </button>
      </span>
    })

    return <div className='list-component'>
      <span>{ chipTags }</span>
      <br/>
      <form onSubmit={this.addTag}>
        <input type='text' style={input_style}/>{' '}
        <button className='button' style={input_style}>Add tag</button>
      </form>
    </div>
  }
}

const chip_tag = {
  background: 'dodgerblue',
  padding: '4px',
  paddingLeft: '8px',
  margin: '5px',
  marginLeft: '0px',
  borderRadius: '5px',
  display: 'inline-flex',
  color: 'white'
}

const x_button_style = {
  height: '20px',
  width: '20px',
  display: 'inline-flex',
  padding: '0px',
  marginLeft: '5px'
}

const x_style = {
  fontSize: '10px',
  marginBottom: '2px',
  margin: 'auto auto'
}

const input_style = {
  height: '25px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '14px',
  paddingLeft: '5px',
  lineHeight: '14px'
}

export default Tags
