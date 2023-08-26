import { describe, test, expect } from 'vitest'
import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'

import App from "../App"

//🎯
describe("Testing the 'Create' Idea functionality", () => { 
  test("Test 'Create' Idea via Idea-Board", async () => {  
    ///TEAR-UP 
    localStorage.clear();
    const { getByRole, getByPlaceholderText, getByTestId } = render(<App />);

    //- Fire create new idea card
    const createButton = getByTestId('create idea');
    await userEvent.click(createButton);
    
    //- Update title and description 
    const titleInput = getByPlaceholderText('Write your title here');
    const descriptionInput = getByPlaceholderText('Write your description here');
    await userEvent.type(titleInput, "This is the New Test Title")
    await userEvent.type(descriptionInput, "This is the New Test Description");
    fireEvent.blur(descriptionInput);

    //- Fire submit button
    const submitButton = getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton)

    //- check that it is working
    await waitFor(() => {
      const newIdeaCardTitle = screen.getByText("This is the New Test Title");
      const newIdeaCardDescripition = screen.getByText("This is the New Test Description")
      expect(newIdeaCardTitle).toBeInTheDocument();
      expect(newIdeaCardDescripition).toBeInTheDocument();
    });

    ///TEAR DOWN
    localStorage.clear();
  });

  test("Test 'Create' Idea via Modal", async () => {  
    ///TEAR UP
    localStorage.clear();
    const { getByRole, getByPlaceholderText, getByText, getByTestId } = render(<App />);
  
    //- open the modal 
    const createButton = getByTestId('create idea');
    userEvent.click(createButton);
  
    //- update the title and description 
    const titleInput = getByPlaceholderText('Your title goes here');
    const descriptionInput = getByPlaceholderText('Your description goes here');
    fireEvent.change(titleInput, { target: { value: 'New Idea Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Idea Description' } });
    fireEvent.blur(descriptionInput);
  
    //- click the submit button
    const submitButton1 = getByRole("button", { name: "Save your Idea" });
    await userEvent.click(submitButton1)
  
    //- check that it is working
    await waitFor(() => {
      const newIdeaCard = getByText("New Idea Title");
      expect(newIdeaCard).toBeInTheDocument();
    });

    ///TEAR DOWN
    localStorage.clear();
  });

  test("Test 'Create' Idea via Modal", async () => {  
    ///TEAR UP
    localStorage.clear();
    const { getByRole, getByTestId } = render(<App />);
  
    //- open the modal 
    const createButton = getByTestId('create idea');
    userEvent.click(createButton);
  
    //- click generate fake idea button
    const generateFakeIdeaButton = getByRole("button", { name: "Generate Fake Ideas"});
    await userEvent.click(generateFakeIdeaButton);

    //- check local storage
    const localStorageCheck = localStorage.getItem("ideas");
  
    //- check that it is working
    await waitFor(() => {
      expect(localStorageCheck).not.toBeNull();
    });

    ///TEAR DOWN
    localStorage.clear();
  });
});

//✅
describe("Testing the 'Delete' Idea functionality", () => { 
  test("Testing the 'Delete' Idea functionality", async () => {
    ///TEAR-UP 
    const TestIdeaData = [
      {
        unique_key: 'Atest',
        title: 'A Test Idea',
        description: 'Description A',
        created_at: '2021-08-01',
        edited_at: '2021-08-02',
      },
      {
        unique_key: 'Btest',
        title: 'B Test Idea',
        description: 'Description B',
        created_at: '2022-08-01',
        edited_at: '2022-08-02',
      },
      {
        unique_key: 'Ctest',
        title: 'C Test Idea',
        description: 'Description C',
        created_at: '2023-08-01',
        edited_at: '',
      }
    ];    
    localStorage.setItem("ideas", JSON.stringify(TestIdeaData));
    render(<App />);


    //-Checking the data has been initialized correctly 
    const IdeaA = screen.getByText("A Test Idea");
    const IdeaB = screen.getByText("B Test Idea");
    const IdeaC = screen.getByText("C Test Idea");
    expect(IdeaA).toBeInTheDocument();
    expect(IdeaB).toBeInTheDocument();
    expect(IdeaC).toBeInTheDocument();


    //-Locating an Idea and clicking the delete button 
    const title = 'A Test Idea';
    const deleteButton = screen.getByLabelText(`delete idea button for ${title}`)
    await userEvent.click(deleteButton)

    //-Confirm the Idea has been successfully deleted
    waitFor(() => {
      const deletedIdea = screen.queryByText("A Test Idea");
      expect(deletedIdea).not.toBeInTheDocument();
      expect(IdeaA).not.toBeInTheDocument();
      expect(IdeaB).toBeInTheDocument();
      expect(IdeaC).toBeInTheDocument();

    });

    ///TEAR-DOWN
    localStorage.clear();
  });
});

//✅
describe("Testing the 'Edit' Idea functionality", () => { 
  //test EDIT TITLE ONLY ✔
  test("Testing ability to update/edit existing card Title", async () => {
    ///TEAR-UP 
    const TestIdeaData = [
      {
        unique_key: 'Atest',
        title: 'A Test Idea',
        description: 'Description A',
        created_at: '2021-08-01',
        edited_at: '2021-08-02',
      },
      {
        unique_key: 'Btest',
        title: 'B Test Idea',
        description: 'Description B',
        created_at: '2022-08-01',
        edited_at: '2022-08-02',
      },
      {
        unique_key: 'Ctest',
        title: 'C Test Idea',
        description: 'Description C',
        created_at: '2023-08-01',
        edited_at: '',
      }
    ];    
    localStorage.setItem("ideas", JSON.stringify(TestIdeaData));
    render(<App />);


    //- locate title and update the text 
    const titleCardA = screen.getByText('A Test Idea');   
    await userEvent.type(titleCardA, " (edited Title)");

    //- submit the changes witht the submit button 
    const submitButton = screen.getByRole("button", { name: "Save Edit"});
    await userEvent.click(submitButton);

    //- assert 
    await waitFor (() => {
      const newTitleCardA = screen.getByText("A Test Idea (edited Title)");
      expect(newTitleCardA).toBeInTheDocument();
    });


    ///TEAR-DOWN
    localStorage.clear();
  });

  //test EDIT DESCRIPTION ONLY ✔
  test("Testing ability to update/edit existing card Description", async () => {
    ///TEAR-UP 
    const TestIdeaData = [
      {
        unique_key: 'Atest',
        title: 'A Test Idea',
        description: 'Description A',
        created_at: '2021-08-01',
        edited_at: '2021-08-02',
      },
      {
        unique_key: 'Btest',
        title: 'B Test Idea',
        description: 'Description B',
        created_at: '2022-08-01',
        edited_at: '2022-08-02',
      },
      {
        unique_key: 'Ctest',
        title: 'C Test Idea',
        description: 'Description C',
        created_at: '2023-08-01',
        edited_at: '',
      }
    ];    
    localStorage.setItem("ideas", JSON.stringify(TestIdeaData));
    render(<App />);

    ///
    //- locate title and update the text 
    const descriptionCardB = screen.getByText('Description B');   
    await userEvent.type(descriptionCardB, " (edited Description)");

    //- submit the changes witht the submit button 
    const submitButton2 = screen.getByRole("button", { name: "Save Edit"});
    await userEvent.click(submitButton2);


    await waitFor (() => {
      const newTitleCardB = screen.getByText("Description B (edited Description)");
      expect(newTitleCardB).toBeInTheDocument();
    });



    ///TEAR-DOWN
    localStorage.clear();
  });

  //test EDIT TITLE + DESCRIPTION ✔
  test("Testing ability to update/edit existing card Title & Description", async () => {
    ///TEAR-UP 
    const TestIdeaData = [
      {
        unique_key: 'Atest',
        title: 'A Test Idea',
        description: 'Description A',
        created_at: '2021-08-01',
        edited_at: '2021-08-02',
      },
      {
        unique_key: 'Btest',
        title: 'B Test Idea',
        description: 'Description B',
        created_at: '2022-08-01',
        edited_at: '2022-08-02',
      },
      {
        unique_key: 'Ctest',
        title: 'C Test Idea',
        description: 'Description C',
        created_at: '2023-08-01',
        edited_at: '',
      }
    ];    
    localStorage.setItem("ideas", JSON.stringify(TestIdeaData));
    render(<App />);

    //- locate title and update the text 
    const titleCardC = screen.getByText('C Test Idea');  
    const descriptionCardC = screen.getByText('Description C'); 
    await userEvent.type(titleCardC, " (edited Title)");  
    await userEvent.type(descriptionCardC, " (edited Description)");

    //- submit the changes witht the submit button 
    const submitButton3 = screen.getByRole("button", { name: "Save Edit"});
    await userEvent.click(submitButton3);


    await waitFor (() => {
      const newTitleCardC = screen.getByText("Description C (edited Description)");
      const newDescriptionCardC = screen.getByText("Description C (edited Description)");
      expect(newTitleCardC).toBeInTheDocument();
      expect(newDescriptionCardC).toBeInTheDocument();
    });

    ///TEAR-DOWN
    localStorage.clear();
  });

});

//✅
describe("Testing forbidden 'Edits' to existing cards", () => { 
  //test DESCRIPTION OVER 140 CHARACTERS ✔
  test("Test having over 140 characters in description is forbidden to submit", () => {
    ///TEAR-UP 
    const TestIdeaData = [
      {
        unique_key: 'unique_key',
        title: 'Test Title',
        description: '',
        created_at: '2021-08-01',
        edited_at: '',
      },
    ];    
    localStorage.setItem("ideas", JSON.stringify(TestIdeaData));
    render(<App />);

    //-update description
    const descriptionTextArea = screen.getByPlaceholderText("Write your description here");
    fireEvent.change(descriptionTextArea, { target: {value: "a".repeat(141)}})  // Set character count to 141

    //-validate submit button is disabled
    const submitButton = screen.getByRole("button", { name: "Save Edit" });
    expect(submitButton).toBeDisabled();

    ///TEAR-DOWN
    localStorage.clear();
  });
  
  //test LEAVE TITLE AND/OR DESCRIPTION BLANK ✔
  test("Test leaving title & description blank is forbidden w/ error message", async () => {
    ///TEAR-UP 
    const TestIdeaData = [
      {
        unique_key: 'unique_key',
        title: 'Test Title',
        description: 'Test Description',
        created_at: '2021-08-01',
        edited_at: '',
      }
    ];      
    localStorage.setItem("ideas", JSON.stringify(TestIdeaData));
    render(<App />);

    //-checking the data has been initialized correctly 
    const titleInput = screen.getByPlaceholderText('Write your title here');
    const descriptionInput = screen.getByPlaceholderText('Write your description here');
    //-leave title blank
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.blur(titleInput); // Trigger blur to show error message
    //-Leave description blank
    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.blur(descriptionInput); // Trigger blur to show error message
    //-Click Submit Button
    const submitButton = screen.getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton)

    //- Validate error message 
    const TitleErrorMessage = await screen.findByText('Title is required');
    const descriptionErrorMessage = await screen.findByText('Description is required');
    expect(TitleErrorMessage).toBeInTheDocument();
    expect(descriptionErrorMessage).toBeInTheDocument();

    ///TEAR-DOWN
    localStorage.clear();

  });
});

//✅
describe('Testing Sorting Functionality', () => { 
  //test INTEGRATION-TEST ✔
  test("check functionality of sorting by title A-Z", async () => {
    ///TEAR-UP 
    const mockData = [
      {
        unique_key: 'Apple',
        title: 'Apple',
        description: 'Apple description',
        created_at: '2021-08-11',
        edited_at: '2021-08-12',
      },
      {
        unique_key: 'Banana',
        title: 'Banana',
        description: 'Banana description',
        created_at: '2022-08-11',
        edited_at: '2022-08-12',
      },
      {
        unique_key: 'Orange',
        title: 'Orange',
        description: 'Orange description',
        created_at: '2023-08-11',
        edited_at: '',
      }
    ];
    localStorage.setItem("ideas", JSON.stringify(mockData));
    render(<App />);
  
    //- Open Sort Dropdown and click button
    const dropdownTrigger = screen.getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
    const alphabeticalButton = screen.getByText("Title A-Z");
    await userEvent.click(alphabeticalButton);
  
    //-Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = screen.getAllByTestId("idea-card-title");

    //-Extract the text content of each title
    const titleTexts = ideaCardTitles.map(titleElement => titleElement.textContent);

    //-Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map(title =>
      mockData.find(idea => idea.title === title)
    );

    //-Check if the ideas are in the correct reverse-sorted order by title
    const reverseSortedIdeas = [...mockData].sort((a, b) => a.title.localeCompare(b.title));
    expect(sortedIdeas).toEqual(reverseSortedIdeas);

    ///TEAR-DOWN
    localStorage.clear();
  });

  //test INTEGRATION-TEST ✔
  test("check functionality of sorting by title Z-A", async () => {
    ///TEAR-UP 
    const mockData = [
      {
        unique_key: 'Apple',
        title: 'Apple',
        description: 'Apple description',
        created_at: '2021-08-11',
        edited_at: '2021-08-12',
      },
      {
        unique_key: 'Banana',
        title: 'Banana',
        description: 'Banana description',
        created_at: '2022-08-11',
        edited_at: '2022-08-12',
      },
      {
        unique_key: 'Orange',
        title: 'Orange',
        description: 'Orange description',
        created_at: '2023-08-11',
        edited_at: '',
      }
    ];
    localStorage.setItem("ideas", JSON.stringify(mockData));
    render(<App />);
    
    //- Open Sort Dropdown and click button
    const dropdownTrigger = screen.getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
    const alphabeticalReversedButton = screen.getByText("Title Z-A");
    await userEvent.click(alphabeticalReversedButton);
  
    //-Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = screen.getAllByTestId("idea-card-title");
  
    //-Extract the text content of each title
    const titleTexts = ideaCardTitles.map(titleElement => titleElement.textContent);
  
    //-Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map(title =>
      mockData.find(idea => idea.title === title)
    );
  
    //-Check if the ideas are in the correct reverse-sorted order by title
    const reverseSortedIdeas = [...mockData].sort((a, b) => b.title.localeCompare(a.title));
    expect(sortedIdeas).toEqual(reverseSortedIdeas);

    ///TEAR-DOWN
    localStorage.clear();
    
  });

  //test INTEGRATION-TEST ✔
  test("check functionality of sorting by date", async () => {
    ///TEAR-UP 
    const mockData = [
      {
        unique_key: 'Apple',
        title: 'Apple',
        description: 'Apple description',
        created_at: '2021-08-11',
        edited_at: '2021-08-12',
      },
      {
        unique_key: 'Banana',
        title: 'Banana',
        description: 'Banana description',
        created_at: '2022-08-11',
        edited_at: '2022-08-12',
      },
      {
        unique_key: 'Orange',
        title: 'Orange',
        description: 'Orange description',
        created_at: '2023-08-11',
        edited_at: '',
      }
    ];
    localStorage.setItem("ideas", JSON.stringify(mockData));
    render(<App />);
    
    //- Open Sort Dropdown and click button
    const dropdownTrigger = screen.getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
    const dateButton = screen.getByText("Date");
    await userEvent.click(dateButton);
  
    //- Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = screen.getAllByTestId("idea-card-title");
  
    //- Extract the text content of each title
    const titleTexts = ideaCardTitles.map(titleElement => titleElement.textContent);
  
    //- Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map(title =>
      mockData.find(idea => idea.title === title)
    );
  
    //- Check if the ideas are in the correct sorted order by date
    const sortedByDate = [...mockData].sort((a, b) => {
      const dateA = a.edited_at || a.created_at;
      const dateB = b.edited_at || b.created_at;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
    expect(sortedIdeas).toEqual(sortedByDate);

    ///TEAR-DOWN
    localStorage.clear();
  });  

});