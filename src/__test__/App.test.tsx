import { describe, test, expect, vi, it } from 'vitest'
import { render } from '@testing-library/react'
import App from "../App"


describe('Checking if jest is functional', () => {
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
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
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

    test('should not set data if there is no data in LocalStorage', () => {
        // Arrange: Mocking LocalStorage to return null
        const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
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