import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

export default class Task extends Component {
  static defaultProps = {
    label: '',
    id: 0,
    done: false,
    edit: false,
    date: Date.now(),
    onDeleted: () => {},
    onToggleEdited: () => {},
    onToggleDone: () => {},
  }

  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.number,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    date: PropTypes.number,
    onDeleted: PropTypes.func,
    onToggleEdited: PropTypes.func,
    onToggleDone: PropTypes.func,
  }

  state = {
    value: this.props.label,
  }

  onSubmitEditedTask = (e) => {
    e.preventDefault()
    const { id, onEdited } = this.props
    onEdited(id, this.state.value)
  }

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  changeClassNames = (done, edit) => {
    let classNames = ''
    if (done) {
      classNames = 'completed'
    }
    if (edit) {
      classNames = 'editing'
    }
    return classNames
  }

  render() {
    const { label, id, edit, done, date, onDeleted, onToggleEdited, onToggleDone } = this.props
    const time = formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    })

    return (
      <li className={this.changeClassNames(done, edit)}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created {time}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onToggleEdited} aria-label="edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="delete" />
        </div>
        <form onSubmit={this.onSubmitEditedTask}>
          <input type="text" className="edit" value={this.state.value} onChange={this.onLabelChange} required />
        </form>
      </li>
    )
  }
}
