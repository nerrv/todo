import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    onDeleted: () => {},
    onEdited: () => {},
    onToggleEdited: () => {},
    onToggleDone: () => {},
  }

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onEdited: PropTypes.func,
    onToggleEdited: PropTypes.func,
    onToggleDone: PropTypes.func,
  }

  render() {
    const { tasks, onDeleted, onEdited, onToggleEdited, onToggleDone } = this.props

    const elements = tasks.map((item) => {
      const { id, label, done, edit, date, minutes, seconds } = item

      return (
        <Task
          key={id}
          id={id}
          label={label}
          done={done}
          edit={edit}
          date={date}
          minutes={minutes}
          seconds={seconds}
          onDeleted={() => onDeleted(id)}
          onEdited={onEdited}
          onToggleEdited={() => onToggleEdited(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
