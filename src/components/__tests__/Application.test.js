import React from "react";
import axios from "axios";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent,
  prettyDOM, 
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  })

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'))

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday'))
      expect(getByText(day, 'no spots remaining')).toBeInTheDocument()
    });

    it("loads data, cancels an interview and reduces the spots remaining for Monday by 1", async () => {
      const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId (container, 'appointment').find(appointment => 
        queryByText (appointment, 'Archie Cohen'))

    // Click the "Delete" button on the booked appointment.
      fireEvent.click(queryByAltText(appointment, 'Delete'))
    // Check that the confirmation message is shown.
        expect(getByText(appointment, 'Are you sure you want to cancel this appointment?'))

    // Click the "Confirm" button on the confirmation.  
      fireEvent.click(getByText(appointment, 'Confirm'))
    // Check that the element with the text "Deleting" is displayed.
        expect(getByText(appointment, 'Deleting...')).toBeInTheDocument()
        
    // Wait until the element with the "Add" button is displayed.
      await waitForElement(() => getByAltText(appointment, 'Add'))
      const day = getAllByTestId(container, 'day').find(day =>
        queryByText(day, 'Monday'))
    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
        expect(getByText(day, '2 spots remaining')).toBeInTheDocument()

        // debug()
    })

    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
      const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
    // Click Edit button on already booked appointment
      const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
      )
      fireEvent.click(queryByAltText(appointment, 'Edit'))
    // Check that the element with the text "Edit" is displayed.
      expect(getByText(appointment, 'Save')).toBeInTheDocument()
    // Click Save button and save interview
      fireEvent.change(getByDisplayValue(container, 'Archie Cohen'), {
        target: { value: 'Emily Nicholas' }
      })
      fireEvent.click(getByText(appointment, 'Save'))
    // Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, 'Saving')).toBeInTheDocument()
    // Wait until the text "Emily Nicholas" is displayed.
      await waitForElement(() => queryByText(appointment, 'Emily Nicholas'))
    // Check that the DayListItem with the text "Monday" still shoes same remaining spots for Monday.
      const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
      )
      expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
      debug()
      })

    /* test number five */
    it("shows the save error when failing to save an appointment", async() => {

      axios.put.mockRejectedValueOnce();

    });
    it('shows the delete error when faling to delete and existing appointment'), async() => {

      axios.delete.mockRejectedValueOnce();

    }

  })  