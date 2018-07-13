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
import DateRange from './DateRange'
import SocketTransmitter from './SocketTransmitter'
import NotificationDrawer from './NotificationDrawer'
import TagsCategoriesSettings from './TagsCategoriesSettings'

// import data from './data'

const address =  {
  api: 'http://unstoo.xyz',
  socket: 'ws://unstoo.xyz:5005'
}

if (process.env.NODE_ENV === 'dev') {
  address.api = 'http://localhost:5000'
  address.socket = 'ws://localhost:5005'
} 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: 'durawka',
      author: '',
      data: [],
      tagsByCategory: {
        kyc: 'department',
        ico: 'product',
        design: 'depratment'
      },
      categories: ['none', 'product', 'department', 'substance'],
      selectedTags: [],
      selectedDatesRange: {
        start: 0,
        end: 0,
      },
      showFeedbacksOnlyWithoutTags: false,
      showModalForNewFeedback: false,
      showModalForTagsConfig: false
    } 
    
    this.downloadData()
  }

  clearDateRangeFilter = () => {
    this.setState({
      selectedDatesRange: { start: 0, end: 0 }
    })
  }

  downloadData = async () => {
      let result
      try {
        const res = await fetch(address.api + '/api/getdata', {credentials: 'same-origin'})
        result = await res.json()

        this.setState((prevState, props) => {
          return { 
            data: result.data,
            author: result.author,
            tagsByCategory: result.tagsByCategory
          }
        })
      } catch (e) {
        console.warn('An error downloading data.')
        console.warn(e)
      }
  }

  setDateRangeFilter = (options) => {
    console.log('setDateRangeFilter')
    console.log(options)
    
    this.setState((prevState, props) => {
      return { selectedDatesRange: {
        start: options.start,
        end: options.end,
        } 
      }
    })
  }

  showModal = () => {
    this.setState((prevState, props) => {
      return { showModalForNewFeedback: !prevState.showModalForNewFeedback }
    })
  }

  showModal2 = () => {
    this.setState((prevState, props) => {

      return { showModalForTagsConfig: !prevState.showModalForTagsConfig }
    })
  }

  removeFeedback = (e) => {
    e.preventDefault()
    const feedbackIndexToRemove = parseInt(e.target.dataset.feedbackindex)

    this.setState((prevState, props) => {
      data = prevState.data.filter(feedback => feedback.id !== feedbackIndexToRemove)

      return { data }
    })

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
      return { data, showModalForNewFeedback: !prevState.showModalForNewFeedback }
    })
  }

  sendFeedback = async (feedback) => { 
    try {
      const res = await fetch(address.api + '/api/feedback', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(feedback),
      headers: {
              "Content-Type": "application/json; charset=utf-8"
          }
      })
      const result = await res.json()

    } catch (e) {
      console.warn('An err while trying to send feedback')
      console.warn(e)
    }
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

  addTag = async ({tagName, feedbackId}) => {
    try {
      const res = await fetch(address.api+'/api/tag', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          tagName,
          feedbackId
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      const result = await res.text()
    } catch (e) {
      console.log('err in addTag')
      console.log(e)
    }
  }
  
  removeTag = async ({feedbackId, tagName}) => {

    try {
      const res = await fetch(address.api+'/api/tag', {
        credentials: 'same-origin',
        method: 'DELETE',
        body: JSON.stringify({
          tagName,
          feedbackId
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      const result = await res.text()

    } catch (e) {
      console.log('err in removeTag')
      console.log(e)
    }
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

  setTagCategory = async({tagName, categoryName}) => {
    console.log('setTagCategory', options);
    try {
      const res = await fetch(address.api + '/api/category', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({tagName, categoryName}),
      headers: {
              "Content-Type": "application/json; charset=utf-8"
          }
      })
      const result = await res.json()

    } catch (e) {
      console.warn('An err while trying to send feedback')
      console.warn(e)
    }
  }

  renameTag = async({ currentTagName, newTagName }) => {
    console.log('renameTag', {currentTagName, newTagName})
    console.log({currentTagName, newTagName})

    try {
      const res = await fetch(address.api + '/api/tag', {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify({currentTagName, newTagName}),
      headers: {
              "Content-Type": "application/json; charset=utf-8"
          }
      })
      const result = await res.json()
      // TODO: not-ok api reply handler

    } catch (e) {
      console.warn('An err while trying to send feedback')
      console.warn(e)
    }
  }

  // WebSocket listeners

  wsAddFeedback = ({ author, body }) => {
    console.log('wsAddFeedback')
    console.log(author, body);
    const newFeedback = body

    this.setState((prevState, props) => {

      const data = prevState.data.concat(newFeedback)
      // TODO hide spinner (and make one ;-))
      if (this.isAuthorMe(author) === false)
        this.showNotification(author + 'has added new feedback')

      return { 
        data, 
        showModalForNewFeedback: this.isAuthorMe(author) ? false : prevState.showModalForNewFeedback  
      }
    })
  }

  wsAddTag = ({ author, body }) => {
    console.log('wsAddTag', author, body);

    this.setState((prevState, props) => {

      const data = prevState.data.concat()
      const index = findFeedbackIndexInDataByFeedbackId(data, body.feedbackId)
      const tagsList = data[index].tags
      const updatedTagsList = {}

      const updatedTags = Object.assign(
        {},
        body.tags,
        data[index].tags,
      )

      data[index].tags = updatedTags

      let newTagsByCategory = {}

      Object.keys(body.tags).forEach(tagName => {
          newTagsByCategory[tagName] = 'none'
      })

      let returning = { data, tagsByCategory: Object.assign({}, newTagsByCategory, prevState.tagsByCategory) }
      
      return returning
    })
  
  }

  wsDeleteTag = ({ author, body }) => {
    console.log('wsDeleteTag', author, body)
    console.log({ author, body })

    this.setState((prevState, props) => {
      const data = prevState.data.concat()
      const index = findFeedbackIndexInDataByFeedbackId(data, body.feedbackId)
      const tagsList = data[index].tags
      const updatedTagsList = {}

      Object.keys(tagsList).forEach(tagName => {
        if (tagName !== body.tagName)
          updatedTagsList[tagName] = tagsList[tagName]
      })

      data[index].tags = updatedTagsList

      return { data }
    })  
  }

  wsSetCategory = ({ author, body }) => {
    console.log('wsSetCategory', author, body)
    console.log({ author, body })

    this.setState((prevState, props) => {
      let tagsByCategory = prevState.tagsByCategory
      tagsByCategory[body.tagName] = body.categoryName
      return { tagsByCategory }
    })  
  }

  wsPurgeTag = ({ author, body }) => {
    console.log('wsPurgeTag', author, body)
    console.log({ author, body })

    this.setState((prevState, props) => {
      let tagsByCategory = prevState.tagsByCategory
      delete tagsByCategory[body.tagName]
      return { tagsByCategory }
    }) 

  }

  wsRenameTag = ({ author, body }) => {
    console.log('wsRenameTag', author, body)
    // body: { currentTagName, newTagName }
    console.log({ author, body })

    // Get fresh db dump
    // or update 

    this.setState((prevState, props) => {
      let returning = { 
        data: []
       }

      prevState.data.forEach(feedback => {
        const containsTagNameToBeUpdated = Object.keys(feedback.tags).includes(body.currentTagName)
        let temp = {}

        if (containsTagNameToBeUpdated) {
          temp = feedback.tags[body.currentTagName]
          delete feedback.tags[body.currentTagName]
          feedback.tags[body.newTagName] = temp
        }

        returning.data.push(feedback)
      })

      let updatedTagsByCategory = Object.assign({}, prevState.tagsByCategory)

      let temp = updatedTagsByCategory[body.currentTagName]
      delete updatedTagsByCategory[body.currentTagName]

      if (updatedTagsByCategory[body.newTagName] === undefined) {
        updatedTagsByCategory[body.newTagName] = temp
      }

      returning.tagsByCategory = updatedTagsByCategory

      return returning
    })
  }

  // Utils

  isAuthorMe = (author) => {
    return this.state.author === author
  }

  showNotification = (notification) => {
    this.setState({
      notification
    })
    
    // TODO: notification stack
    // TODO: notification side window
  }

  render() {
    let filteredData = this.state.data

    // Filter by date range

    if (this.state.selectedDatesRange.start && this.state.selectedDatesRange.end) {
      filteredData = filteredData.filter(feedback => {
        if (feedback.date >= this.state.selectedDatesRange.start && feedback.date <= this.state.selectedDatesRange.end)
          return true
      })
    }

    // Show only feedbacks without tags
    if (!this.state.selectedTags.length &&
      this.state.showFeedbacksOnlyWithoutTags) {
        filteredData = filteredData.filter(feedback => {
          return Object.keys(feedback.tags).length === 0
        })
    }
    
    // Show only those feedbacks that have all selected tags.
    if (this.state.selectedTags.length) {
      filteredData = filteredData.filter(feedback => {  
        const tagsOfFeedback = Object.keys(feedback.tags)
        return arrayIncludesAllEntries(tagsOfFeedback, this.state.selectedTags) 
      })
    }


    return <div className='main-frame'>
      <NotificationDrawer msg={this.state.notification} timeout={this.state.notificationTimeout} />

      <ModalForm handlers={{onSubmit: this.sendFeedback}} visible={this.state.showModalForNewFeedback}/>
      <TagsCategoriesSettings handlers={{onChange: this.setTagCategory, renameTag: this.renameTag}} categories={this.state.categories} data={this.state.tagsByCategory} amIVisible={this.state.showModalForTagsConfig} />

      <SocketTransmitter router={{
        'feedback-add': this.wsAddFeedback, // { author, body: { feedbackId, chatUrl, date, comment, tags, country } }
        'tag-add': this.wsAddTag, // { atuhor, body: { feedbackId, tagName } }
        'tag-delete': this.wsDeleteTag, // { author, body: { feedbackId, tagName } }
        'tag-rename': this.wsRenameTag,
        'tag-purge': this.wsPurgeTag, // { author, body: { tag } }
        'category-set': this.wsSetCategory // { author, body: { tagName, categoryName } }
        }}
        serverAddress={ address.socket }
      />

      <div className='feedbacks-list'>
        { this.state.data.length > 0 && <React.Fragment>
          <h2>Feedback list</h2> 
          <List data={filteredData}
            handlers={{addTag: this.addTag, removeTag: this.removeTag, removeFeedback: this.removeFeedback}}  
          />
        </React.Fragment> }
      </div>

      <div className='right'>
        <a href='logout' className='button' style={margin_bottom}>Logout</a>
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

        <div className='button' style={margin_bottom} onClick={this.showModal}>Add feedback</div>
        <div className='button' style={margin_bottom} onClick={this.showModal2}>Tags config</div>
        
        <DateRange handlers={{ onSubmit : this.setDateRangeFilter }}>
          Set date range
        </DateRange>

        <button className='button' onClick={this.clearDateRangeFilter}>Clear date range</button>

          <h3>Tags index</h3> 
          <TagsIndex data={filteredData}
            tagsByCategory={this.state.tagsByCategory}
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

function findFeedbackIndexInDataByFeedbackId(data, id) {
  for (let index = 0; index < data.length; index++) {
    if (data[index].id === id)
      return index 
  }
}

const margin_bottom = {marginBottom: '10px'}
