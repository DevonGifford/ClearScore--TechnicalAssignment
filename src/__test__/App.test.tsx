import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App"


describe('Checking if jest is functional', () => {
    //test 1 - just checking config
    test('checking methods are working', () => {
        expect(true).toBe(true)
    })

    //test 2 - chekcing ability to render 
    test("checking that renderign is working", () => {
        render(<App />)
        expect(true).toBeTruthy()
    })

    it('checking what "it" does', () => {
        expect(true).toBe(true)
    })

    //test x - checking ability to mock LocalStorage


    //test x - checking ability to use stubs


    //test x - checking ability to use spies
})

describe('CHECK LOCAL STORAGE, on component mount - (useEffect)', () => {
    it('should load data from LocalStorage on component mount', () => {
      // Arrange: Mocking LocalStorage and setting an initial value
      const storedData = [
        {
          unique_key: 'test1',
          title: 'Idea 1',
          description: 'Description 1',
          created_at: '2023-08-01',
          edited_at: '2023-08-02',
        },
      ];
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
      getItemSpy.mockReturnValue(JSON.stringify(storedData));
  
      // Act: Rendering the component
      render(<App />);
  
      // Assert: Verify that the stored data is correctly set in the component state
      expect(getItemSpy).toHaveBeenCalledWith('ideas'); // Verify getItem was called with 'ideas'
      expect(getItemSpy).toHaveBeenCalledTimes(1); // Verify getItem was called only once
      // You might need to assert the component state here using your testing library utility
      // For example, if you're using RTL, you might do something like:
      // const ideaElement = screen.getByText('Idea 1');
      // expect(ideaElement).toBeInTheDocument();
  
      // Clean up
      getItemSpy.mockRestore(); // Restore the original behavior of getItem
    });

    it('should not set data if there is no data in LocalStorage', () => {
        // Arrange: Mocking LocalStorage to return null
        const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
        getItemSpy.mockReturnValue(null);
    
        // Act: Rendering the component
        render(<App />);
    
        // Assert: Verify that no data is set in the component state
        expect(getItemSpy).toHaveBeenCalledWith('ideas'); // Verify getItem was called with 'ideas'
        expect(getItemSpy).toHaveBeenCalledTimes(1); // Verify getItem was called only once
        // You might need to assert that no data elements are rendered in your component
        // For example, if you're using RTL, you might do something like:
        // const ideaElement = screen.queryByText('Idea 1');
        // expect(ideaElement).toBeNull();
    
        // Clean up
        getItemSpy.mockRestore(); // Restore the original behavior of getItem
    });
  
    // Add more test cases if needed
});

describe('UPDATE LOCAL STORAGE, with new data - (useEffect)', () => {
    
    it('should update local storage when data changes', () => {
        // Arrange: Render the component
        const { getByRole } = render(<App />);
        
        // Act: Create a new idea
        userEvent.click(getByRole('button', { name: /new idea/i }));
        // Assuming there's a form to input data and submit it
        // Simulate filling out the form and clicking the submit button
      
        // Assert: Verify that local storage is updated
        const storedData = localStorage.getItem('ideas');
        expect(storedData).toBeTruthy(); // Check that data exists in local storage
      
        if (storedData !== null) {
          const parsedStoredData = JSON.parse(storedData);
          expect(Array.isArray(parsedStoredData)).toBe(true); // Check that data is an array
          // You might want to further verify the contents of the stored data
          // For example, expect(parsedStoredData[0].title).toBe('New Idea Title');
        }
      
        // Cleanup: Clear local storage
        localStorage.removeItem('ideas');
    });     
  
    it('should not update local storage if data is empty', () => {
      // Arrange: Mock local storage
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  
      // Act: Render the component
      render(<App />);
  
      // Assert: Verify that local storage is not updated
      expect(setItemSpy).not.toHaveBeenCalled();
  
      // Cleanup: Restore the original behavior of setItem
      setItemSpy.mockRestore();
    });
  
    // Add more test cases if needed
});

describe('handleCreateIdea', () => {
    it('should create a new idea and update state', () => {
        // Arrange: Render the component
        const { getByRole } = render(<App />);
        
        // Debugging: Log the button elements found
        console.log('Button found:', getByRole('button'));
    
        // Act: Create a new idea
        userEvent.click(screen.getByTestId('create-idea-button'));

        // Assuming there's a form to input data and submit it
        // Simulate filling out the form and clicking the submit button
    
        // Assert: Verify that state is updated
        // Assuming your component has a way to display created ideas
        // You can use getByText or other queries to find the created idea
    
        // Cleanup: Clear local storage
        localStorage.removeItem('ideas');
      });
  

  });



  //test 


  