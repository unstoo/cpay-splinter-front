import React from 'react'
import ReactDOM from 'react-dom'

// TODO: Refactor this piece of shit

class TagsCategoriesSettings extends React.Component {

  changeName = e => {
    e.preventDefault()

    const newTagName = prompt('Enter new tag name')
    const currentTagName = e.target.dataset.tagname
    this.props.handlers.renameTag({ 
      currentTagName,
      newTagName
    })
  }
  
  categoryOptions = ({tagName, currentCategory}) => { 
    let categoryOptions = []

    this.props.categories.forEach((category, index) => { 
      categoryOptions.push(<option key={index}>{category}</option>) 
    })

    return <select name={tagName} onChange={e => {
      this.props.handlers.onChange({tagName: e.target.name, categoryName: e.target.value})
    }} defaultValue={currentCategory}>
      { categoryOptions }
    </select>
  }

  render() {

    const { data: tagsByCategory, categories } = this.props
    const rows = []

    Object.keys(tagsByCategory).sort().forEach((tagName, index) => {
      let row = <tr key={ 'row' + index }>
        <td>
          {/* TODO: use an .svg instead of img src */}
          <img onClick={this.changeName} data-tagname={tagName} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Ic_create_48px.svg/1000px-Ic_create_48px.svg.png' height='25' width='25'/>
        </td>
        <td>{ tagName }</td>
        <td>{ this.categoryOptions({ tagName, currentCategory: tagsByCategory[tagName] }) }</td>
      </tr>

      rows.push(row)
    })
    // tags
    // categories

    return <div style={this.props.amIVisible ? style_visible : style_hidden} className='modal-shadow'>
      <table>
        <tbody>
        { rows }
        </tbody>
      </table>
    </div>
  }
}

export default TagsCategoriesSettings

// var okowko = (
//   <button onClick={this.modalVisiblityToggler}>Toggler</button>
//   <ModalForm handlers={{visibilityToggler: this.modalVisiblityToggler}}>
//     <TagsCategoriesSettings handlers={{}} data={}/>
//   </ModalForm>
  
//   <ModalForm handlers={{visibilityToggler: this.modalVisiblityToggler}}>
//     <Feedback handlers={{}} data={}/>
//   </ModalForm>
// )


const style_visible = {
  top: '100px',
  position: 'fixed',
  background: 'white',
  left: '320px',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}

const style_hidden = {
  top: '-1000px',
  position: 'fixed',
  background: 'white',
  left: '320px',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}


