import React, { Component } from 'react'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onLabelChange = (e) => {
    const { target } = e
    const { name } = target
    this.setState({
      [name]: target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state
    const { onAdded } = this.props
    onAdded(label, minutes, seconds)
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={label}
            name="label"
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onLabelChange}
            value={minutes}
            name="minutes"
            pattern="^[0-5]?[0-9]$"
            maxLength="2"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onLabelChange}
            value={seconds}
            name="seconds"
            pattern="^[0-5]?[0-9]$"
            maxLength="2"
            autoFocus
            required
          />
          <button type="submit"></button>
        </form>
      </header>
    )
  }
}
