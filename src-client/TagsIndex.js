import React from 'react'
import ReactDOM from 'react-dom'

class TagsIndex extends React.Component { 
  onTagClick = e => {
    e.preventDefault()
    const tagName = e.target.dataset.tagname
    this.props.handlers.selectTag({tagName})
  }

  render() {    
      const tagsCountInAllFeedbacks = {} 

      this.props.data.forEach(feedback => {
      const tagsOfSingleFeedback = feedback.tags.split(' ')
      
      tagsOfSingleFeedback.forEach(aTag => {

        if (aTag === '') return
        if (this.props.filteredTags.includes(aTag)) return
        
        if (tagsCountInAllFeedbacks[aTag]) {
          tagsCountInAllFeedbacks[aTag] += 1
        } else {
          tagsCountInAllFeedbacks[aTag] = 1
        }
      })
    })


    const keys = Object.keys(tagsCountInAllFeedbacks)
    const chipTags = keys.map((key, index) => <span key={ key+'-'+index } style={ chipTag } data-tagname={key}
      onClick={this.onTagClick}>
      { key } : { tagsCountInAllFeedbacks[key] } </span>)

    return <div className='list-component'>
      { chipTags }
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

export default TagsIndex
