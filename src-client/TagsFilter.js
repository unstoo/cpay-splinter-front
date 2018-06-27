import React from 'react'
import ReactDOM from 'react-dom'
import Tags from './Tags'

class TagsFilter extends React.Component { 

  onTagClick = e => {
    e.preventDefault()
    console.log(e.target.innerHTML);
    this.props.handlers.deselectTag({tagName: e.target.innerText})
    
  }

  render() {

    const tags = this.props.data.map((key, index) => <span key={ key+'-'+index } style={ chipTag } data-tagname={key}
      onClick={this.onTagClick}>
      { key } <button type='button'>x</button>  </span>)

    return <div className='list-component'>
      { tags }
    </div>
  }
}


const chipTag = {
  background: 'dodgerblue',
  padding: '5px',
  margin: '4px',
  borderRadius: '4px',
  display: 'inline-block',
  color: 'white'
}

export default TagsFilter
