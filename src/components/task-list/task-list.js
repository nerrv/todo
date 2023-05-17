import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

const TaskList = ({ tasks, onDeleted, onEdited, onToggleEdited, onToggleDone }) => {
  const elements = tasks.map(({ id, label, done, edit, date, minutes, seconds }) => {
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

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onEdited: () => {},
  onToggleEdited: () => {},
  onToggleDone: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TaskList
