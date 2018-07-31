import React from 'react'
import ReactDOM from 'react-dom'

class AgentsIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = e => {
    e.preventDefault()
  }

  render() {
    const feedbacksByAgentCount = {}

    this.props.data.forEach(feedback => {
      if (feedbacksByAgentCount[feedback.name] === undefined) {
        feedbacksByAgentCount[feedback.name] = 1
      } else {
        feedbacksByAgentCount[feedback.name] += 1
      }
    })

    const agentsIndex = []

    Object.keys(feedbacksByAgentCount).sort().forEach((agent, index) => {
      if (agent.includes('@cryptopay.me') === false) return
      agentsIndex.push(<div key={index}>{agent}: {feedbacksByAgentCount[agent]}</div>)
    })
    return <div>
      { agentsIndex }
    </div>
  }
}

export default AgentsIndex