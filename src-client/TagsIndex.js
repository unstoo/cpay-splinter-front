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
      const { tagsByCategory } = this.props

      this.props.data.forEach(feedback => {
      const tagsOfSingleFeedback = Object.keys(feedback.tags)
      
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

    const tagsSortedByCategories = {
      ['']: []
    }

    const tagNames = Object.keys(tagsCountInAllFeedbacks)
    
    tagNames.sort().forEach((tagName, index) => {
      let categoryName = 'none'

      if (tagsByCategory[tagName]) {
        categoryName = tagsByCategory[tagName]
      }

      if (!tagsSortedByCategories[categoryName]) {
        tagsSortedByCategories[categoryName] = []
      }

      let tagChip = <span key={ tagName+'-'+index } style={ chipTag } data-tagname={tagName} onClick={this.onTagClick}>
      { tagName } : { tagsCountInAllFeedbacks[tagName] } </span>

      tagsSortedByCategories[categoryName].push(tagChip)
    })

    const tagsIndex = []

    Object.keys(tagsSortedByCategories).forEach(categoryName => {
      let category = <div><h4>{categoryName}</h4>{tagsSortedByCategories[categoryName]}</div>

      tagsIndex.push(category)
    })

    return <div className='list-component'>
      {tagsIndex}
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
