import { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../timer'

import './task.css'

const Task = ({ label, id, edit, done, date, minutes, seconds, onDeleted, onEdited, onToggleEdited, onToggleDone }) => {
  const [value, setValue] = useState(label)

  const onSubmitEditedTask = (e) => {
    e.preventDefault()
    onEdited(id, value)
  }

  const onLabelChange = (e) => {
    setValue(e.target.value)
  }

  const time = formatDistanceToNow(date, {
    includeSeconds: true,
    addSuffix: true,
  })

  return (
    <li className={(done && 'completed') || (edit && 'editing') || null}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <Timer minutes={minutes} seconds={seconds} done={done} />
          <span className="description">created {time}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onToggleEdited} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="delete" />
      </div>
      <form onSubmit={onSubmitEditedTask}>
        <input type="text" className="edit" value={value} onChange={onLabelChange} required />
      </form>
    </li>
  )
}

Task.defaultProps = {
  label: '',
  id: 0,
  done: false,
  edit: false,
  date: Date.now(),
  minutes: '',
  seconds: '',
  onDeleted: () => {},
  onToggleEdited: () => {},
  onToggleDone: () => {},
}

Task.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.number,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default Task
