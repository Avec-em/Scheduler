import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";


export function useApplicationData() {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`api/appointments/${id}`, {interview})
    .then(res => {
      setState({...state, appointments});
    })
  };

  const cancelInterview = function(id) {
    console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        setState({...state, appointments})
      })
  }

  useEffect(() => { 
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
    .then(([daysRes, appointmentRes, interviewersRes]) => {
      console.log(interviewersRes.data)
      setState(prev => ({...prev, days: daysRes.data, appointments:appointmentRes.data, interviewers:interviewersRes.data}))
    })

  }, []);
  
  return { state, setDay, bookInterview, cancelInterview }

}