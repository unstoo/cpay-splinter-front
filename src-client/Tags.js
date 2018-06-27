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

    this.props.handlers.removeTag({
      index: this.props.index,
      tagName: e.target.dataset.tagname
    })
  }

  addTag = (e) => {
    e.preventDefault()

    const newTagName = e.target[0].value
    e.target[0].value = ''

    if (newTagName === '') return

    this.props.handlers.addTag({
      index: this.props.index,
      tagName: newTagName
    })
  }

  render() {
    const tags = this.props.data.split(' ')
    const chipTags = tags.map(tag => {
      if (!tag) return

      return <span key={tag} style={chipTag}>
        { tag + ' ' }  
        <button onClick={this.removeTag} data-tagname={tag}>x</button>
      </span>
    })

    return <div className='list-component'>
      <span>{ chipTags }</span>
      <br/>
      <form onSubmit={this.addTag}>
        <input type='text' />{' '}
        <button>Add tag</button>
      </form>
    </div>
  }
}


const chipTag = {
  background: 'rgba(29,119,201,1)',
  padding: '4px',
  paddingLeft: '8px',
  margin: '5px',
  marginLeft: '0px',
  borderRadius: '4px',
  display: 'inline-block',
  color: 'white'
}

export default Tags
