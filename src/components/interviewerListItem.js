import React from 'react'
import classnames from 'classnames/bind';
import 'components/interviewerListItem.scss'

const InterviewerListItem = function(props) {
  const interviewerClass = classnames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected
  })
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

export default InterviewerListItem