import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { setConfig } from 'react-hot-loader'
setConfig({ logLevel: 'debug' })

import TagsIndex from './TagsIndex'
import List from './List'
import TagsFilter from './TagsFilter'
import Toggler from './Toggler'
import SwitchChildren from './SwitchChildren'
import SaveToFile from './SaveToFile'
import LoadFileContent from './LoadFileContent'
import ModalForm from './ModalForm'


class App extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectedTags: [],
      showFeedbacksOnlyWithoutTags: false,
      showModalForNewFeedback: false
    }    
  }

  addNewFeedback = (e) => {
    e.preventDefault()
    const newFeedback = {}
    e.target.querySelectorAll('input').forEach(input => {
      newFeedback[input.name] = input.value
      input.value = ''
    })
    
    this.setState((prevState, props) => {
      newFeedback.id = prevState.data.length
      const data = prevState.data.concat(newFeedback)
      return { data }
    })
  }

  loadData = (data) => {
    window.data = data
    this.setState((prevState, props) => {
      return { data }
    })
  }

  toggleFeedbackList = () => {
    this.setState((prevState, props) => {
      return { showFeedbacksOnlyWithoutTags: !prevState.showFeedbacksOnlyWithoutTags }
    })
  }

  addTag = (options) => {
    console.log('addTag')
    console.log(options)
    const data = this.state.data
    const entry = data[options.index]
    // duplicate tag for the given feedback entry
    if (entry.tags.split(' ').includes(options.tagName)) return

    entry.tags += ' ' + options.tagName
    data[options.index] = entry
    this.setState({
      data
    })
  }
  
  removeTag = (options) => {
    console.log('removeTag')
    console.log(options)

    const data = this.state.data
    const entry = data[options.index]
    const purgedTagsList = removeWordFromString(entry.tags, options.tagName)
    entry.tags = purgedTagsList
    data[options.index] = entry
    this.setState({
      data
    })
  }

  selectTag = (options) => {
    this.setState((prevState, props) => {
      const selectedTags = prevState.selectedTags.slice()
      if (selectedTags.includes(options.tagName)) return {}
      selectedTags.push(options.tagName)
      return { selectedTags }
    })
  }

  deselectTag = (options) => {
    this.setState((prevState, props) => {
      const selectedTags = prevState.selectedTags.slice()
      const indexOfTagToDeselect = selectedTags.findIndex(tag => tag === options.tagName)
      selectedTags.splice(indexOfTagToDeselect, 1)
      return { selectedTags }
    })
  }

  render() {
    let filteredData = this.state.data

    if (!this.state.selectedTags.length &&
      this.state.showFeedbacksOnlyWithoutTags) {
        filteredData = filteredData.filter(feedback => {
          return feedback.tags === ''
        })
    }
    
    // Show only those feedbacks that have all selected tags.
    if (this.state.selectedTags.length) {
      filteredData = filteredData.filter(feedback => {  
        const tagsOfFeedback = feedback.tags.split(' ')
        return arrayIncludesAllEntries(tagsOfFeedback, this.state.selectedTags) 
      })
    }

    return <div className='main-frame'>
      <div className='feedbacks-list'>
        { this.state.data.length > 0 && <React.Fragment>
          <h2>Feedback list</h2> 
          <List data={filteredData}
            handlers={{addTag: this.addTag, removeTag: this.removeTag}}  
          />
        </React.Fragment> }
      </div>

      <div className='right'>
        {/* <ModalForm handlers={{onSubmit: this.addNewFeedback}}>
        </ModalForm> */}
        <Toggler handlers={{toggle: this.toggleFeedbackList}} 
          style={margin_bottom}>
          <SwitchChildren active={this.state.showFeedbacksOnlyWithoutTags}>
            <span>Feedbacks without tags</span>
            <span>Show all feedbacks</span>
          </SwitchChildren>
        </Toggler>

        <SaveToFile data={this.state.data} style={margin_bottom}>
          Save feedbacks
        </SaveToFile>

        <LoadFileContent handlers={{dataLoaded: this.loadData}} style={margin_bottom}>
          Load feedbacks
        </LoadFileContent>

          <h3>Tags index</h3> 
          <TagsIndex data={filteredData}
            filteredTags={this.state.selectedTags}
            handlers={{selectTag: this.selectTag}} 
          />

          <h3>Filter by tags</h3>
          <TagsFilter data={this.state.selectedTags}
            handlers={{deselectTag: this.deselectTag}}/>
      </div>
    </div>
  }
}

export default hot(module)(App)



function removeWordFromString(string, word) {
  let cutString = ''
  const wordsInString = string.split(' ')
  const indexOfTheWord = wordsInString.findIndex(aWord => aWord === word)
  wordsInString.splice(indexOfTheWord, 1)
  cutString = wordsInString.join(' ')
  return cutString
}

function arrayIncludesAllEntries(array, entries) {
  let flag = true 
  entries.forEach(entry => {
    if (array.includes(entry) === false) 
      flag = false
  })

  return flag
}

function arrayIncludesAtLeastOneEntry(array, entries) {
  let flag = false

  for (let index = 0; index < entries.length; index++) {
    console.log(entries[index])
    if (array.includes(entries[index])) {
      return true
    }
  }

  return flag
}

const margin_bottom = {marginBottom: '10px'}