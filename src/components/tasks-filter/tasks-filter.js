import { useState } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
]

const TasksFilter = ({ filter, onFilterChange }) => {
  const [buttons] = useState(filterButtons)

  const elements = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const btnClass = isActive ? 'selected' : null
    return (
      <li key={name}>
        <button type="button" className={btnClass} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{elements}</ul>
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}

export default TasksFilter
