import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent  from '@testing-library/user-event'

import IdeaCard from "@/components/IdeaCard";

const mockDeleteIdea = vi.fn();
const mockEditIdea = vi.fn();

describe("Testing IdeaCard renders elements correctly", () => {
  //test UNIT-TEST ✔
  test("renders card correctly with 'empty/new' data", () => {
    const { getByPlaceholderText } = render(
      <IdeaCard 
        index={0}
        created=""
        edited=""
        title=""
        description=""
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}  
      /> 
    );
    
    expect(getByPlaceholderText("Write your title here")).toBeInTheDocument();
    expect(getByPlaceholderText("Write your description here")).toBeInTheDocument();
  });

  //test UNIT-TEST ✔
  test("renders card correctly with recieved data", () => {
    const { getByText, getByPlaceholderText } = render(
      <IdeaCard 
        index={1}
        created="2021-10-10"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}  
      /> 
    );

    const cardTitle = getByText("Test Title");
    const cardDescription = getByText("Test Description")

    expect(cardTitle).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();

    expect(getByText("Created: 2021-10-10")).toBeInTheDocument();
    expect(getByPlaceholderText("Write your title here")).toBeInTheDocument();
    expect(getByPlaceholderText("Write your description here")).toBeInTheDocument();
  });
    
  //test UNIT-TEST ✔
  test("check 'Save-Edit' & 'Progress-bar' renders upon editing an idea", () => {
    const { getByText, getByRole } = render(
      <IdeaCard 
        index={1}
        created="2021-10-10"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}  
      /> 
    );

    const cardDescription = getByText("Test Description");
    fireEvent.change(cardDescription, {
      target: { value: "test".repeat(10) }, 
    });

    const submitButton = getByRole("button", { name: "Save Edit" });
    const progressBar = getByRole("progress-bar");

    expect(submitButton).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();

  });

  //test UNIT-TEST ✔
  test("check 'Character-countdown' number renders correctly", () => {
    const { getByText, getByRole } = render(
      <IdeaCard 
        index={1}
        created="2021-10-10"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}  
      /> 
    );
    
    //- update the descripiton in order to render the conditional charcountdown component
    const cardDescription = getByText("Test Description");
    fireEvent.change(cardDescription, {
      target: { value: "a".repeat(10) }, 
    });
    //- Get the actual char countdown value from the UI
    const charCountDown = getByRole("char-countdown");
    const charCountDownValue = parseInt(charCountDown.textContent || "0", 10);
    //- Calculate the expected char countdown value
    const expectedCharCountDownValue = 140 - "a".repeat(10).length;
        
    expect(charCountDown).toBeInTheDocument();
    expect(charCountDownValue).toBe(expectedCharCountDownValue);
  });
  
  //test UNIT-TEST ✔ 
  test("check 'created/edited' text renders correctly & accordingly", () => {
    const { getByText } = render(
      <IdeaCard 
        index={1}
        created="2021-10-10"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}  
      /> 
    );
    //- Assert that the created timestamp text is rendered
    expect(getByText("Created: 2021-10-10")).toBeInTheDocument();
    
    //- Update the edited prop with a new value (simulate updating card)
    render(
      <IdeaCard 
        index={1}
        created="2021-10-10"
        edited="2023-08-11"
        title="Test Title"
        description="Updated Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}  
      />
    );
    //- Assert that the edited timestamp text is rendered
    expect(getByText("Edited: 2023-08-11")).toBeInTheDocument();
  });   
});

describe("Testing functionality", () => {
  //🎯 todo clean up - this isn't doing what I want it to
  //test INTEGRATION-TEST ✔ 
  test("calls handleEditIdea and sets editsMade to false on form submission", async () => {
    const { getByRole, getByPlaceholderText } = render(
      <IdeaCard
        index={0}
        created="2021-08-01"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}
      />
    );

    const titleTextarea = getByPlaceholderText("Write your title here");
    const descriptionTextarea = getByPlaceholderText("Write your description here");
    
    //- Fill out form fields
    fireEvent.change(titleTextarea, { target: { value: "Updated Title" } });
    fireEvent.change(descriptionTextarea, { target: { value: "Updated Description" } });
    
    //- submit button renders after edits
    const submitButton = getByRole("button", { name: "Save Edit" });

    //- Trigger a form submit event
    const form = getByRole("form");
    fireEvent.submit(form);
    fireEvent.click(submitButton)

    //- Await and expect asynchronous changes
    await waitFor(() => {
        expect(mockEditIdea).toBeCalledTimes(1);
        // expect(mockEditIdea).toHaveBeenCalledWith(0, "Updated Title", "Updated Description");
        //? I don't know how to get this to work
        //? I think this requires having to do a big integration test
    });
  });

  //test UNIT-TEST ✔
  test("test the delete button renders and function is called when clicked", () => {
    const { getByRole } = render(
      <IdeaCard
        index={0}
        created="2021-08-01"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}
      />
    );

    const deleteButton = getByRole("delete-button");
    expect(deleteButton).toBeInTheDocument();

    //-press deletebutton
    fireEvent.click(deleteButton)

    //-check what happens 
    expect(mockDeleteIdea).toBeCalledTimes(1);

  });

  //test UNIT-TEST ✔
  test("disables submit button when character count exceeds 140", () => {
    const { getByRole, getByPlaceholderText } = render(
      <IdeaCard
        index={0}
        created="2021-08-01"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}
      />
    );

    const descriptionTextarea = getByPlaceholderText("Write your description here");
    fireEvent.change(descriptionTextarea, {
      target: { value: "a".repeat(141) }, // Set character count to 141
    });

    const submitButton = getByRole("button", { name: "Save Edit" });
    expect(submitButton).toBeDisabled();
  });

  //test INTEGRATION-TEST ✔
  test('calls submit handler when form is submitted', () => {
    const { getByRole, getByPlaceholderText } = render(
      <IdeaCard
        index={0}
        created="2021-08-01"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}
      />
    );
    const titleInput = getByPlaceholderText('Write your title here');
    const descriptionInput =getByPlaceholderText('Write your description here');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    
    const submitButton = getByRole('button', { name: 'Save Edit' });
    fireEvent.click(submitButton);

    expect(mockEditIdea).toHaveBeenCalledOnce();
  });

  //test INTEGRATION-TEST ✔
  test('shows validation error for empty title input', async () => {
    const { findByText, getByPlaceholderText, getByRole } = render(
      <IdeaCard
        index={0}
        created="2021-08-01"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}
      />
    );

    const titleInput = getByPlaceholderText('Write your title here');
    
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.blur(titleInput); // Trigger blur to show error message

    const submitButton = getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton)

    const errorMessage = await findByText('Title is required'); // Adjust this error message based on your validation schema
    expect(errorMessage).toBeInTheDocument();
  });

  //test ✔
  test('shows validation error for empty description input', async () => {
    const { findByText, getByPlaceholderText, getByRole } = render(
      <IdeaCard
        index={0}
        created="2021-08-01"
        edited=""
        title="Test Title"
        description="Test Description"
        handleDeleteIdea={mockDeleteIdea}
        handleEditIdea={mockEditIdea}
      />
    );

    const descriptionInput = getByPlaceholderText('Write your description here');
    
    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.blur(descriptionInput); // Trigger blur to show error message

    const submitButton = getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton)

    const errorMessage = await findByText('Description is required'); // Adjust this error message based on your validation schema
    expect(errorMessage).toBeInTheDocument();
  });

});