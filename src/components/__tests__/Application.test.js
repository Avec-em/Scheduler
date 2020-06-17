import React from "react";

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

        debug()
    })

    it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {
      const { container, debug } = render(<Application />);
    })

  })