import React from 'react';
import DayListItem from 'components/dayListItem'


const DayList = (props) => {
  const daySelection = props.days.map((day, index) => (
    <DayListItem 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}
    key={index}
    />
    ))
  return (
    <ul>
      {daySelection}
    </ul>
  );
}

export default DayList