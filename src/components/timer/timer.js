import { useState, useEffect } from 'react'

import './timer.css'

const Timer = ({ minutes, seconds, done }) => {
  const [pause, setPause] = useState(true)
  const [min, setMinutes] = useState(minutes)
  const [sec, setSeconds] = useState(seconds)

  useEffect(() => {
    let intervalId
    if (done) {
      setPause(true)
    }
    if (!pause && !done) {
      intervalId = setInterval(() => {
        if (!min) {
          setMinutes(0)
        }
        if (sec > 0) {
          setSeconds(sec - 1)
        } else if (min > 0) {
          setMinutes(min - 1)
          setSeconds(59)
        } else {
          clearInterval(intervalId)
        }
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [pause, min, sec])

  const onPlay = () => {
    setPause(false)
  }

  const onPause = () => {
    setPause(true)
  }

  const formatTime = (time) => (time < 10 ? `0${+time}` : time)

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onPlay}></button>
      <button className="icon icon-pause" onClick={onPause}></button>
      <span>
        {formatTime(min)}:{formatTime(sec)}
      </span>
    </span>
  )
}

export default Timer
