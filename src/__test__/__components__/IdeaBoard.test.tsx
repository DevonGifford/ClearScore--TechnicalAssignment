import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import userEvent  from '@testing-library/user-event'

import IdeaBoard from "@/components/IdeaBoard";


describe("Testing everything is rendered correctly", () => {

  //test UNIT-TEST ✔
  test('renders the "Add New Idea" button', () => {
    const { getByRole } = render(
      <IdeaBoard 
        data={[]} 
        handleCreateIdea={() => {}} 
        handleDeleteIdea={() => {}} 
        handleEditIdea={() => {}} 
      />
    );
    const addButton = getByRole('new-idea-button');
    expect(addButton).toBeInTheDocument();
  });

  //test UNIT-TEST ✔
  test('renders the "Sort Dropdown" button', () => {
    const { getByRole } = render(
      <IdeaBoard 
        data={[]} 
        handleCreateIdea={() => {}} 
        handleDeleteIdea={() => {}} 
        handleEditIdea={() => {}} 
      />
    );

    const dropDownButton = getByRole("sort-dropdown");
    expect(dropDownButton).toBeInTheDocument();
  });
    
  //🎯 Needs improvement 
  //test UNIT-TEST
  test('test that hovering effect is working on cards', async () => {
    ///Given NewIdea Card is rendered
    const { getByTestId } = render(
      <IdeaBoard 
        data={[]} 
        handleCreateIdea={() => {}} 
        handleDeleteIdea={() => {}} 
        handleEditIdea={() => {}} 
      />
    );
    const createNewIdeaCard = getByTestId('new-idea-card');
    expect(createNewIdeaCard).toBeInTheDocument();
    
    ///When user hovers over the element 
    await userEvent.hover(createNewIdeaCard);
    
    ///Then card should render bigger 
    expect(createNewIdeaCard).toHaveClass('hover:scale-110');
    //? this isn't a good test, I am not sure how to test this properly ...
  });
});


describe("Testing functionality", () => {
  //test UNIT-TEST ✔
  test('adds a new idea card when "Add New Idea" button is clicked', () => {
    const mockCreateIdea = vi.fn();
    const { getByRole } = render(
      <IdeaBoard 
        data={[]} 
        handleCreateIdea={mockCreateIdea} 
        handleDeleteIdea={() => {}} 
        handleEditIdea={() => {}} 
      />
    );
    const addButton = getByRole('new-idea-button');
    fireEvent.click(addButton);
    expect(mockCreateIdea).toHaveBeenCalled();
  });

  //test UNIT-TEST ✔ 
  test("check the 'Sort Dropdown' button dropdown renders correct sort options", async () => {
    ///Given NewIdea Card is rendered
    const { getByRole, getByText } = render(
      <IdeaBoard 
        data={[]} 
        handleCreateIdea={() => {}} 
        handleDeleteIdea={() => {}} 
        handleEditIdea={() => {}} 
      />
    );
    const dropdownTrigger = getByRole("sort-dropdown");
    expect(dropdownTrigger).toBeInTheDocument();

    await userEvent.click(dropdownTrigger);
    const defaultButton = getByText('Default')
    const alphabeticalButton = getByText('Title A-Z');
    const alphabeticalReversedButton = getByText('Title Z-A')
    const dateButton = getByText('Date')

    expect(defaultButton).toBeInTheDocument();
    expect(alphabeticalButton).toBeInTheDocument();
    expect(alphabeticalReversedButton).toBeInTheDocument();
    expect(dateButton).toBeInTheDocument();
    
    fireEvent.click(alphabeticalButton);
  });

  //test INTEGRATION-TEST ✔
  test("check functionality of sorting by title A-Z", async () => {
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
    ]
    const { getByText, getByRole, getAllByTestId } = render(
      <IdeaBoard
        data={mockData}
        handleCreateIdea={() => {}}
        handleDeleteIdea={() => {}}
        handleEditIdea={() => {}}
      />
    );
  
    const dropdownTrigger = getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
  
    const alphabeticalButton = getByText("Title A-Z");
    await userEvent.click(alphabeticalButton);
  
    // Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = getAllByTestId("idea-card-title");

    // Extract the text content of each title
    const titleTexts = ideaCardTitles.map(titleElement => titleElement.textContent);

    // Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map(title =>
      mockData.find(idea => idea.title === title)
    );

    // Check if the ideas are in the correct reverse-sorted order by title
    const reverseSortedIdeas = [...mockData].sort((a, b) => a.title.localeCompare(b.title));
    expect(sortedIdeas).toEqual(reverseSortedIdeas);
    });

  //test INTEGRATION-TEST ✔
  test("check functionality of sorting by title Z-A", async () => {
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
    ]
    const { getByText, getByRole, getAllByTestId } = render(
      <IdeaBoard
        data={mockData}
        handleCreateIdea={() => {}}
        handleDeleteIdea={() => {}}
        handleEditIdea={() => {}}
      />
    );
  
    const dropdownTrigger = getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
  
    const alphabeticalReversedButton = getByText("Title Z-A");
    await userEvent.click(alphabeticalReversedButton);
  
    // Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = getAllByTestId("idea-card-title");
  
    // Extract the text content of each title
    const titleTexts = ideaCardTitles.map(titleElement => titleElement.textContent);
  
    // Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map(title =>
      mockData.find(idea => idea.title === title)
    );
  
    // Check if the ideas are in the correct reverse-sorted order by title
    const reverseSortedIdeas = [...mockData].sort((a, b) => b.title.localeCompare(a.title));
    expect(sortedIdeas).toEqual(reverseSortedIdeas);
    
  });

  //test INTEGRATION-TEST ✔
  test("check functionality of sorting by date", async () => {
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
    ]
    const { getByText, getByRole, getAllByTestId } = render(
      <IdeaBoard
        data={mockData}
        handleCreateIdea={() => {}}
        handleDeleteIdea={() => {}}
        handleEditIdea={() => {}}
      />
    );
  
    const dropdownTrigger = getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
  
    const dateButton = getByText("Date");
    await userEvent.click(dateButton);
  
    // Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = getAllByTestId("idea-card-title");
  
    // Extract the text content of each title
    const titleTexts = ideaCardTitles.map(titleElement => titleElement.textContent);
  
    // Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map(title =>
      mockData.find(idea => idea.title === title)
    );
  
    // Check if the ideas are in the correct sorted order by date
    const sortedByDate = [...mockData].sort((a, b) => {
      const dateA = a.edited_at || a.created_at;
      const dateB = b.edited_at || b.created_at;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  
    expect(sortedIdeas).toEqual(sortedByDate);
  });  

});