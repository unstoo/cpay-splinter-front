import React from 'react'
import ReactDOM from 'react-dom'

class DateRange extends React.Component { 
  constructor(props) {
    super(props)
    
    this.state = {
      isRangeSane: false,
      errorMessage: 'Please set dates.',
      start: props.start,
      end: props.end
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
      errorMessage,
      start: startDate,
      end: endDate
    })
  }

  startDate = (e) => {
    if (e.target.tagName === 'INPUT') {
      return e.target.parentNode.parentNode.querySelectorAll('input[name=start]')[0].value
    }
    return e.target.querySelectorAll('input[name=start]')[0].value
  }

  endDate = (e) => {
    if (e.target.tagName === 'INPUT') {
      return e.target.parentNode.parentNode.querySelectorAll('input[name=end]')[0].value
    }
    return e.target.querySelectorAll('input[name=end]')[0].value
  }

  clearDates = () => {
    const state = {
      start: 0,
      end: 0
    }
    this.setState(state)
    this.props.handlers.onSubmit(state)
  }

  render() {

    let { start, end } = this.state
    start = start === 0 ? '' : start
    end = end === 0 ? '' : end
    return <div>
      <form onSubmit={ this.onSubmit }>
        <label style={style_label}>From
          <input name='start' type='date' onChange={this.checkDateRangeSanity} value={start} style={style_input}/>
        </label>
        <label style={style_label}>To
          <input name='end' type='date' onChange={this.checkDateRangeSanity} value={end} style={style_input}/>
        </label>
        <button className='button' style={style_margin_button}> { this.props.children[0] } </button>
        <button className='button' type='button' onClick={this.clearDates}> { this.props.children[1] } </button>
      </form>
    </div>
  }
}

export default DateRange

const style_margin_button= {
  marginTop: '10px',
  marginRight: '5px'
}
const style_label = {
  display: 'flex',
  width: '100%'
}
const style_input = {
  marginLeft: 'auto',
  marginRight: '90px',
  marginBottom: '5px',
  paddingLeft: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  height: '24px'
}
