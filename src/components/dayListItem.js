import React from "react";
import classnames from 'classnames/bind';
import "components/dayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  const formatSpots = function() {
    let spotMessage = ''
    if (props.spots === 0) {
      spotMessage = 'no spots remaining'
    } else if (props.spots === 1) {
      spotMessage = '1 spot remaining'
    } else {
      spotMessage = `${props.spots} spots remaining`
    }
    return spotMessage
  }

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  )
}