import React from 'react'
import ReactDOM from 'react-dom'

class NotificationDrawer extends React.Component {
  constructor(props) {
    super(props)
    console.log('DrawerCtor');
    
    // what happens when
    this.state = {
      msg: props.msg,
      visible: false,
      shouldBeHiddenFlag: false
    }
  }

  onClick = e => {
    e.preventDefault()
  }

  componentDidMount() {
        
    //   setTimeout(() => {
    //       console.log('didMount')
    //       this.setState(() => {
    //         return { visible: true }
    //       })
    //     }
    //   , 500)

    //   setTimeout(() => {
    //     console.log('didMount')
    //     this.setState(() => {
    //       return { visible: false }
    //     })
    //   }
    // , 6000)
    
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.msg !== prevProps.msg) {
      this.setState({
        visible: true,
        msg: this.props.msg
      })
      setTimeout(() => {
        this.setState({
          visible: false
        })
      }, 3000)
    }
  }

  render() {
    
    const compoundClass = 'modal-shadow  notification' + (this.state.visible ? '' : ' notification--hidden')
    return <div className={compoundClass}>
      { this.state.msg }
    </div>
  }
}

export default NotificationDrawer
