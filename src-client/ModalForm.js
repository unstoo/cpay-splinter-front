import React from 'react'
import ReactDOM from 'react-dom'

var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var languages = ["Mandarin", "Spanish", "English", "Hindi", "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "Punjabi", "German", "Javanese", "Wu", "Malay", "Telugu", "Vietnamese", "Korean", "French", "Marathi", "Tamil", "Urdu", "Turkish", "Italian", "Yue", "Thai", "Gujarati", "Jin", "SouthernMin", "Persian", "Polish", "Pashto", "Kannada", "Xiang", "Malayalam", "Sundanese", "Hausa", "Odia", "Burmese", "Hakka", "Ukrainian", "Bhojpuri", "Tagalog", "Yoruba", "Maithili", "Uzbek", "Sindhi", "Amharic", "Fula", "Romanian", "Oromo", "Igbo", "Azerbaijani", "Awadhi", "GanChinese", "Cebuano", "Dutch", "Kurdish", "Serbo-Croatian", "Malagasy", "Saraiki", "Nepali", "Sinhalese", "Chittagonian", "Zhuang", "Khmer", "Turkmen", "Assamese", "Madurese", "Somali", "Marwari", "Magahi", "Haryanvi", "Hungarian", "Chhattisgarhi", "Greek", "Chewa", "Deccan", "Akan", "Kazakh", "NorthernMin", "Sylheti", "Zulu", "Czech", "Kinyarwanda", "Dhundhari", "HaitianCreole", "EasternMin", "Ilocano", "Quechua", "Kirundi", "Swedish", "Hmong", "Shona", "Uyghur", "Hiligaynon/Ilonggo", "Mossi", "Xhosa", "Belarusian", "Balochi", "Konkani"]

class ModalForm extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      countryOptions: (() => {
        let list = []
        country_list.forEach(country => list.push(<option key={country}>{country}</option>))
        return list
      })(),
      langOptions: (() => {
        let list = []
        languages.forEach(lang => list.push(<option key={lang}>{lang}</option>))
        return list
      })()
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const feedbackJSON = serializeFeedbackInput(e)
    this.props.handlers.onSubmit(feedbackJSON)
  }

  render() {
    return <React.Fragment>
    <div style={this.props.visible ? style_visible_pad : style_hidden_pad} 
      onClick={this.props.handlers.onToggle}></div>
    <div style={this.props.visible ? style_visible : style_hidden} className='modal-shadow'>
      <form className='modal-form' onSubmit={this.onSubmit}>
        <label className='modal-form__row'>
          <span className='modal-form__label'>Линк на источник</span>
          <input className='modal-form__input' name='url' type='text' data-input='true'/>
        </label>
        <label className='modal-form__row'>
          <span className='modal-form__label'>Страна обратившегося</span>
          <select className='modal-form__input' name='country' data-input='true'>
            {this.state.countryOptions}
          </select>
        </label>
        <label className='modal-form__row'>
          <span className='modal-form__label'>Язык обращения</span>
          <select className='modal-form__input' name='language' data-input='true'>
            {this.state.langOptions}
          </select>
        </label>
        <label className='modal-form__row  modal-form__row--stack'>
          <span className='modal-form__label  modal-form__label--stack'>Комментарий</span>
          <textarea className='modal-form__input  modal-form__input--stack' rows='8' cols='50' name='notes' data-input='true'></textarea>
        </label>
        <label className='modal-form__row'>
          <span className='modal-form__label'>Метки</span>
          <input className='modal-form__input' name='tags' type='text' data-input='true'/>
        </label>
        <hr/>
        <button className='button'>Add New Feedback</button>
      </form>
    </div>
    </React.Fragment>
  }
}

export default ModalForm

const style_visible = {
  top: '100px',
  position: 'fixed',
  background: 'white',
  left: 'calc(50% - 300px)',
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
  left: 'calc(50% - 300px)',
  zIndex: '2',
  padding: '100px',
  borderRadius: '5px',
  border: '1px solid #eee',
  transition: 'top .5s'
}

const style_visible_pad = {
  position: 'fixed',
  zIndex: '1',
  left: '0',
  right: '0',
  bottom: '0',
  background: 'rgba(0,0,0,0.5)',
  transition: 'opacity .8s',
  opacity: '1',
  height: '100vh'
}

const style_hidden_pad = {
  position: 'fixed',
  zIndex: '1',
  left: '0',
  right: '0',
  bottom: '0',
  background: 'rgba(0,0,0,0.5)',
  transition: 'opacity .8s',
  opacity: '0',
  height: '0'
}

const serializeFeedbackInput = (e) => {
  e.preventDefault()
  const newFeedback = {}

  e.target.querySelectorAll('[data-input]').forEach(input => {
    newFeedback[input.name] = input.value
    input.value = ''
  })

  return newFeedback
}