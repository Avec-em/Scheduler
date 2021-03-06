import React, { useState } from 'react'
import Button from 'components/Button'
import InterviewerList from 'components/interviewerList'


const Form = function(props) {
  const [name, setName] = useState(props.name || '')
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  function reset() {
    setName('')
    setInterviewer(null)
  }

  function cancel() {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } 
  
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={event => setName(event.target.value)}
        data-testid="student-name-input"
        /*
          This must be a controlled component
        */
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
    interviewers={props.interviewers}
    onChange={setInterviewer}
    value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}> Save </Button>
    </section>
  </section>
</main>
  )
}

export default Form