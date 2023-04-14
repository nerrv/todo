import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

export default class App extends Component {
  maxId = 0

  state = {
    taskData: [],
    filter: 'all',
  }

  createTask(label) {
    return {
      label,
      done: false,
      edit: false,
      id: this.maxId++,
      date: Date.now(),
    }
  }

  addTask = (text) => {
    const newTask = this.createTask(text)

    this.setState(({ taskData }) => {
      const newTasks = [newTask, ...taskData]

      return {
        taskData: newTasks,
      }
    })
  }

  editTask = (id, text) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const oldTask = taskData[idx]
      const newTask = { ...oldTask, label: text, edit: false }
      const newTasks = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)]

      return {
        taskData: newTasks,
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const newTasks = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]

      return {
        taskData: newTasks,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleEdited = (id) => {
    this.setState(({ taskData }) => ({
      taskData: this.toggleProperty(taskData, id, 'edit'),
    }))
  }

  onToggleDone = (id) => {
    this.setState(({ taskData }) => ({
      taskData: this.toggleProperty(taskData, id, 'done'),
    }))
  }

  filterTasks(tasks, filter) {
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

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ taskData }) => {
      const newData = taskData.filter((task) => !task.done)
      return {
        taskData: newData,
      }
    })
  }

  render() {
    const { taskData, filter } = this.state
    const filteredTasks = this.filterTasks(taskData, filter)

    const doneCount = taskData.filter((el) => el.done).length
    const todoCount = taskData.length - doneCount

    return (
      <section className="todoapp">
        <section className="main">
          <NewTaskForm onAdded={this.addTask} />
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteTask}
            onEdited={this.editTask}
            onToggleEdited={this.onToggleEdited}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            count={todoCount}
            filter={filter}
            clearCompleted={this.clearCompleted}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    )
  }
}
