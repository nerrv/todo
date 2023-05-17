import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'
import './footer.css'

const Footer = ({ count, filter, onFilterChange, clearCompleted }) => {
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

Footer.defaultProps = {
  count: 0,
  filter: 'all',
  onFilterChange: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  count: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
