import { useState } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

const App = () => {
  const [taskData, setTask] = useState([])
  const [filter, setFilter] = useState('all')
  const [key, setKey] = useState(0)

  const createTask = (label, minutes, seconds) => {
    setKey(key + 1)

    return {
      label,
      minutes,
      seconds,
      done: false,
      edit: false,
      id: key,
      date: Date.now(),
    }
  }

  const addTask = (text, minutes, seconds) => {
    const newTask = createTask(text, minutes, seconds)
    setTask((taskData) => {
      const newTasks = [newTask, ...taskData]
      return newTasks
    })
  }

  const editTask = (id, text) => {
    setTask((taskData) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const oldTask = taskData[idx]
      const newTask = { ...oldTask, label: text, edit: false }
      const newTasks = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)]

      return newTasks
    })
  }

  const deleteTask = (id) => {
    setTask((taskData) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const newTasks = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]

      return newTasks
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleEdited = (id) => {
    setTask((taskData) => toggleProperty(taskData, id, 'edit'))
  }

  const onToggleDone = (id) => {
    setTask((taskData) => toggleProperty(taskData, id, 'done'))
  }

  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((task) => !task.done)
      case 'completed':
        return tasks.filter((task) => task.done)
      default:
        return tasks
    }
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const clearCompleted = () => {
    setTask((taskData) => {
      const newData = taskData.filter((task) => !task.done)
      return newData
    })
  }

  const filteredTasks = filterTasks(taskData, filter)

  const doneCount = taskData.filter((el) => el.done).length
  const todoCount = taskData.length - doneCount

  return (
    <section className="todoapp">
      <section className="main">
        <NewTaskForm onAdded={addTask} />
        <TaskList
          tasks={filteredTasks}
          onDeleted={deleteTask}
          onEdited={editTask}
          onToggleEdited={onToggleEdited}
          onToggleDone={onToggleDone}
        />
        <Footer count={todoCount} filter={filter} clearCompleted={clearCompleted} onFilterChange={onFilterChange} />
      </section>
    </section>
  )
}

export default App
