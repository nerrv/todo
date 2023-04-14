import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'
import './footer.css'

export default class Footer extends Component {
  static defaultProps = {
    count: 0,
    filter: 'all',
    onFilterChange: () => {},
    clearCompleted: () => {},
  }

  static propTypes = {
    count: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    clearCompleted: PropTypes.func,
  }

  render() {
    const { count, filter, onFilterChange, clearCompleted } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
