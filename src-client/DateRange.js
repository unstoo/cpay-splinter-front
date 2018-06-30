import React from 'react'
import ReactDOM from 'react-dom'

class DateRange extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      isRangeSane: false,
      errorMessage: 'Please set dates.'
    }
  }

  onSubmit = e => {
    e.preventDefault()

    if (this.state.isRangeSane === false) {
      alert(this.state.errorMessage)
      return
    }

    const options = {
      start: this.startDate(e),
      end: this.endDate(e)
    }

    this.props.handlers.onSubmit(options)
  }

  checkDateRangeSanity = e => {
    let isRangeSane = true
    let errorMessage = ''

    const startDate = this.startDate(e)
    const endDate = this.endDate(e)

    if (!startDate) {
      isRangeSane = false
      errorMessage = `Start date is missing.`
    }

    if (!endDate) {
      isRangeSane = false
      errorMessage = `End date is missing.`
    }

    if (startDate && endDate && startDate > endDate) {
      isRangeSane = false
      errorMessage = `Start date is larger than end date.`
    }
  
    this.setState({
      isRangeSane,
      errorMessage
    })
  }

  startDate = (e) => {
    if (e.target.tagName === 'INPUT') {
      return e.target.parentNode.querySelectorAll('input[name=start]')[0].value
    }

    return e.target.querySelectorAll('input[name=start]')[0].value
  }

  endDate = (e) => {
    if (e.target.tagName === 'INPUT') {
      return e.target.parentNode.querySelectorAll('input[name=end]')[0].value
    }

    return e.target.querySelectorAll('input[name=end]')[0].value
  }

  render() {
    return <div>
      <form onSubmit={ this.onSubmit }>
        <input name='start' type='date' onChange={this.checkDateRangeSanity}/>
        <input name='end' type='date' onChange={this.checkDateRangeSanity}/>
        <br/><br/>
        <button className='button'> { this.props.children } </button>
      </form>
    </div>
  }
}

export default DateRange
