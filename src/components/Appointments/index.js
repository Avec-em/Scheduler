import 'components/Appointments/styles.scss'
import React from 'react'
import Empty from "components/Appointments/empty"
import Show from "components/Appointments/show"
import Form from "components/Appointments/form"
import Status from "components/Appointments/status";
import Confirm from "components/Appointments/confirm";
import Error from "components/Appointments/error";
import useVisualMode from "hooks/useVisualMode"
import { useApplicationData } from "helpers/useApplicationData"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"



const Appointment = function(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {
    transition(CREATE)
  }
  const onCancel = () => {
    transition(EMPTY)
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    return props.bookInterview(props.id, interview)
    .then(() => transition(SHOW)
    )
    .catch((error) => {
      console.log(error)
      transition(ERROR_SAVE, true)
    })
  }

  const onDelete = function (id) {
    transition(DELETING, true);
    return props.cancelInterview(props.id)
    .then (() => transition(EMPTY)) 
    .catch((error) => {
      transition(ERROR_DELETE, true)
    })
  }

  return (
  <article 
  className="appointment"
  data-testid="appointment">
    <header time={props.time}>{props.time}</header>
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
    <Show
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
    />)}
    {mode === CREATE && (
      <Form
      interviewers={props.interviewers}
      onCancel={onCancel}
      onSave={save}
      />
    )}
    {mode === CONFIRM && (
    <Confirm 
      message='Are you sure you want to cancel this appointment?' 
      onCancel={() => back()} 
      onConfirm={() => onDelete(props.id)}
      />
    )}
    {mode === SAVING && (<Status message='Saving'/>)}
    {mode === DELETING && (<Status message='Deleting...'/>)}
    {mode === EDIT && (
    <Form
      name={props.interview.student} 
      interviewer={props.interview.interviewer.id} 
      interviewers={props.interviewers} 
      onCancel={() => back()} 
      onSave={save}
      />
    )}
    {mode === ERROR_SAVE && (
    <Error 
      message='An error occured. Please try again!' 
      onClose={()=>back()}
      />
    )}
    {mode === ERROR_DELETE && (
    <Error message='An error occured. Please try again!' 
    onClose={()=>back()}
    />
    )}
  </article>
  )
}

export default Appointment