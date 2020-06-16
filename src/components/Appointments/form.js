import React, { useState } from 'react'
import Button from 'components/Button'
import InterviewerList from 'components/interviewerList'


const Form = function(props) {
  const [name, setName] = useState(props.name || '')
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  function reset() {
    setName('')
    setInterviewer(null)
  }

  function cancel() {
    reset()
    props.onCancel()
  }

  function save() {
    props.onSave(name, props.interviewer)
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
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList 
    interviewers={props.interviewers}
    onChange={setInterviewer}
    value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(name, interviewer)}> Save </Button>
    </section>
  </section>
</main>
  )
}

export default Form