import { Component } from 'react'

import './timer.css'

export default class Timer extends Component {
  state = {
    isPaused: true,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const { isPaused, minutes, seconds } = this.state
      const { done } = this.props
      if (isPaused || done) return
      if (!minutes) {
        this.setState({ minutes: 0 })
      }
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 })
      } else if (minutes > 0) {
        this.setState({ minutes: minutes - 1, seconds: 59 })
      } else {
        clearInterval(this.intervalId)
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onPlay = () => {
    this.setState({ isPaused: false })
  }

  onPause = () => {
    this.setState({ isPaused: true })
  }

  formatTime = (time) => (time < 10 ? `0${+time}` : time)

  render() {
    const { minutes, seconds } = this.state
    const formatteddMinutes = this.formatTime(minutes)
    const formattedSeconds = this.formatTime(seconds)

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.onPlay}></button>
        <button className="icon icon-pause" onClick={this.onPause}></button>
        <span>
          {formatteddMinutes}:{formattedSeconds}
        </span>
      </span>
    )
  }
}
