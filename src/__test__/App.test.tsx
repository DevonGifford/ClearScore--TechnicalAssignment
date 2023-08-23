import { describe, test, expect, vi, it } from 'vitest'
import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'

import App from "../App"

describe('Checking if Vitest is functional', () => {
    //test 1 - just checking config
    test('checking methods are working', () => {
        expect(true).toBe(true)
    })

    //test 2 - chekcing ability to render 
    test('App mounts properly', () => {
        const wrapper = render(<App />)
        expect(wrapper).toBeTruthy()
    })

    test('checking if "it" works with vitest', () => {
        expect(true).toBe(true)
    })
});

describe('CHECK LOCAL STORAGE, on component mount - (useEffect)', () => {
  //test UNIT-TEST
  it('should load data from LocalStorage on component mount', () => {
    /// Tear Up - Mocking LocalStorage and setting an initial value
    const storedData = [
      {
        unique_key: 'test1',
        title: 'Idea 1',
        description: 'Description 1',
        created_at: '2023-08-01',
        edited_at: '2023-08-02',
      },
    ];
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockReturnValue(JSON.stringify(storedData));
 
    render(<App />);

    expect(screen.getByText(storedData[0].title)).toBeInTheDocument()

    expect(getItemSpy).toHaveBeenCalledWith('ideas');   
    expect(getItemSpy).toHaveBeenCalledTimes(1); 

    ///Tear Down
    getItemSpy.mockRestore(); 
  });

  //test UNIT-TEST 
  test('Should not set data if there is no data in LocalStorage', () => {
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
      getItemSpy.mockReturnValue(null);

      render(<App />);

      expect(getItemSpy).toHaveBeenCalledWith('ideas'); 
      expect(getItemSpy).toHaveBeenCalledTimes(1); 

      getItemSpy.mockRestore(); 
  });

  //test UNIT-TEST 
  test("Check LocalStorage is accessable", () => {
    ///TEAR-UP
    const IdeaTestData = [
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
    localStorage.setItem("ideas", JSON.stringify(IdeaTestData))
    
    ///WHEN
    const checkData = localStorage.getItem("ideas") as string;
    const parsedData = JSON.parse(checkData);
    
    ///THEN 
    expect(parsedData).toStrictEqual(IdeaTestData);

    ///TEAR-DOWN
    localStorage.clear();
  });

});


//? Adive on the CRUD/LocalStorage UNIT TESTS 
describe.skip('Testing the LocalStorage CRUD Functionality', () => {
  //test TODO 
  test.skip("Testing the 'Create-New' Idea function", async () => {  
    localStorage.clear();
    const { getByRole, getByPlaceholderText, getByText, getByTestId } = render(<App />);
  
    //- create a new idea card
    const createButton = getByTestId('create idea');
    userEvent.click(createButton);
  
    //- update the title and description 
    const titleInput = getByPlaceholderText('Write your title here');
    const descriptionInput = getByPlaceholderText('Write your description here');

    fireEvent.change(titleInput, { target: { value: 'New Idea Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Idea Description' } });
    fireEvent.blur(descriptionInput);
  
    //- click the submit button
    //?  Why can't it find this button??
    const submitButton1 = getByRole("button", { name: "Save Edit" });
    const submitButton2 = getByTestId("submit-save-button");
    await userEvent.click(submitButton1)
    await userEvent.click(submitButton2)
  
  
    //- check that it is working
    await waitFor(() => {
      const newIdeaCard = getByText("New Idea Title");
      expect(newIdeaCard).toBeInTheDocument();
    });
  });

  //test TODO
  test("Testing the 'Delete' Idea function ", () => {

  });

  //test TODO
  test("Testing the 'Edit' Idea function ", () => {

  });

});

