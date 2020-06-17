import { useReducer, useState, useEffect } from "react";
import axios from 'axios'

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state, 
        day: action.value
      };
    
    case SET_APPLICATION_DATA :
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    
    case SET_INTERVIEW:
      {const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && {...action.interview}
      };
      const spotsLeft = state.days.map(day => {
        for (let appointmentId of day.appointments) {
          if (appointmentId === action.id) {
            if (action.interview && !state.appointments[action.id].interview) {
              return {
                ...day,
              spots: day.spots -1
            }
          } else if (!action.interview && state.appointments[action.id].interview)
            {
              return {
                ...day,
                spots: day.spots +1
              }
            }
          }
        }
        return day;
      });

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return { ...state, appointments, days: spotsLeft };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day});

  useEffect(() => { 
    
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
    .then(([daysRes, appointmentRes, interviewersRes]) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: daysRes.data, 
        appointments:appointmentRes.data, 
        interviewers:interviewersRes.data
      })
    })
  }, []);


  const bookInterview = function(id, interview) {
    dispatch({ type: SET_INTERVIEW, interview, id });
    const url = "/api/appointments/" + id;
    const data = { interview };
    return axios.put(url, data);
  };

  const cancelInterview = function(id, interview) {
    const url = "/api/appointments/" + id;
    const data = { interview };
    return axios.delete(url, data).then(() => {
      dispatch({ type: SET_INTERVIEW, interview: null, id });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
};