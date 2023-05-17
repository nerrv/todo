import { useState } from 'react'
import './new-task-form.css'

const NewTaskForm = ({ onAdded }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    onAdded(label, minutes, seconds)
    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
          name="label"
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => setMinutes(e.target.value)}
          value={minutes}
          name="minutes"
          pattern="^[0-5]?[0-9]$"
          maxLength="2"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e) => setSeconds(e.target.value)}
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

export default NewTaskForm
