import React from 'react'
import get from 'lodash.get'
import ReactDOM from 'react-dom'
import ObjectInspector from 'react-object-inspector'

const transFromPinoJson = (json) => {
  try {
    const obj = JSON.parse(json)
    const msg = get(obj, 'msg', '{}')
    const idx = msg.indexOf('{')
    const txt = msg.substring(0, idx)
    return JSON.parse(msg.replace(txt, ''))
  } catch (err) {
    const obj = JSON.parse(json)
    const msg = get(obj, 'msg', '{}')
    return msg
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      renderTarget: '{}',
      level: null,
      time: null,
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e) {
    this.setState({ text: e.target.value })
  }

  onClick() {
    const data = JSON.parse(this.state.text)
    const obj = transFromPinoJson(this.state.text)
    this.setState({
      level: data.level,
      time: new Date(data.time).toString(),
      renderTarget: obj,
      text: '{}',
    })
  }

  render() {
    return (
      <React.Fragment>
        <textarea
          onChange={this.onChange}
          value={this.state.text}
          style={{
            margin: '40px',
            width: '80%',
            height: '100px',
          }}
        />
        <button
          style={{
            backgroundColor: 'cyan',
            width: '100px',
            height: '30px',
          }}
          onClick={this.onClick}
        >
          更新
        </button>
        <hr />
        <h3>レベル:{this.state.level || ''}</h3>
        <h3>日付:{this.state.time}</h3>
        <ObjectInspector data={this.state.renderTarget} />
      </React.Fragment>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Form />,
    document.querySelector('#root')
  )
})

