import { describe, it, expect, beforeEach } from 'vitest'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Navbar from '@/components/Navbar'
import { ModeToggle } from '@/components/theme/theme-toggle';
import { ThemeProvider, useTheme } from '@/components/theme/theme-provider';

describe("Check all elements are present on render", () => {
   ///TEAR UP  
   const handleCreateIdea = () => {}
   beforeEach(() => {
      render(<Navbar handleCreateIdea={handleCreateIdea} />);
   });
   
   //type UNIT TESTS ✔
   it('should render logo', () => {
      const logoElement = screen.getByText(/IdeaBank/);
      expect(logoElement).toBeInTheDocument();
   });

   //test UNIT TEST ✔
   it('should render "NEW IDEA" button', () => {
      const buttonElement = screen.getByText(/NEW IDEA/);
      expect(buttonElement).toBeInTheDocument();
   });
  
   //test UNIT TEST ✔
   it('should render theme toggle', () => {
      const themeToggleButton = screen.getByRole("themeButton");
      expect(themeToggleButton).toBeInTheDocument();
   });

   //test UNIT TEST ✔
   it('should render theme toggle button', () => {
      const themeToggleButton = screen.getByRole("themeButton");
      expect(themeToggleButton).toBeInTheDocument();
   });

   //test UNIT TEST ✔
   it('should render the dropdown when clicking theme toggle button', () => {
      const themeToggleButton = screen.getByRole("themeButton");
      expect(themeToggleButton).toBeInTheDocument();
   });

});

describe("Testing Modal Functionality", () => {
   ///TEAR UP   
   const handleCreateIdea = () => {}
   beforeEach(() => {
      render(<Navbar handleCreateIdea={handleCreateIdea} />);
   });   
   
   //type UNIT TEST ✔
   it('should not display modal by default', () => {
      //--the problem and thought process 
      /*
      The problem here is that it's sees the modal html always

      my thought is that I could test the changing of state 
      if the state changes the modal will open/close
      but how do I test the state?
      the answer is that I apparently dont, it goes against the 
      philosophy or the RTL library - instead I should be testing
      the changes in the UI 
      However the UI renders everything
      Okay I figured something out, it's always rendered however what 
      defines weather it's open or closed is a tailwind style 
      opacity-100 or opacity-0
      Now how do I test a style ....
      */ 

      ///GIVEN
      const modalElement = screen.queryByTestId('new-idea-modal');
      
      ///THEN:  Check if the modal has the "invisible" class, which hides it
      expect(modalElement).toHaveClass('opacity-0');
      expect(modalElement).not.toHaveClass('opacity-100');
      expect(modalElement).not.toHaveClass('block');

      //-ATTEMPT - w/ computedStyles
      /* const modalDiv = screen.getByTestId("modal-overlay");
         const modalComputedStyle = window.getComputedStyle(modalDiv);
         console.log('here is the modal computed style console.log', modalComputedStyle)
         expect(modalComputedStyle.visibility).toBe('hidden')
      */ 

      //- ATTEMPT original attempt
      // const modalButton = screen.getByText(/NEW IDEA/);
      // const modalDiv = screen.getByTestId("modal-overlay");
      
      // fireEvent.click(modalButton);  //should opent the modal
      // expect(modalDiv).toHaveProperty("open")


      //expect(modalDiv).toHaveStyle("display : block")
      //expect(modalElement).not.toBeInTheDocument();  //this should not be in the document 
   });

   //type UNIT TEST ✔
   it('should display modal when "NEW IDEA" button is clicked', () => {
      ///Given modal is not open
      const modalElement = screen.queryByTestId('new-idea-modal');
      expect(modalElement).toHaveClass('opacity-0');
      expect(modalElement).not.toHaveClass('opacity-100');

      ///When button triggers open modal
      const buttonElement = screen.getByText(/NEW IDEA/);
      fireEvent.click(buttonElement);
      
      ///Then modal is opened
      expect(modalElement).toHaveClass('opacity-100');  
      expect(modalElement).not.toHaveClass('opacity-0');    
      expect(modalElement).not.toHaveClass('block');
   });

   //type INTEGRATION TEST ✔
   it("should close the modal when clicking the close('x') button", () => {
      ///Given 
      const buttonElement = screen.getByText(/NEW IDEA/);
      const modalElement = screen.queryByTestId('new-idea-modal');
      const closeModalButton = screen.getByTestId("close-modal-button"); 

      ///WHEN 
      expect(modalElement).toHaveClass('opacity-0');     //-check modal is closed
      fireEvent.click(buttonElement);                    //-Simulate opening the modal
      expect(modalElement).toHaveClass('opacity-100');   //-check modal is open
      fireEvent.click(closeModalButton);                 //-Simulate clicking the close button

      ///THEN: check that modal closed
      expect(modalElement).toHaveClass('opacity-0');
   });

   //type INTEGRATION TEST ✔
   it('should close modal when clicked outside', () => { 
      ///Given 
      const buttonElement = screen.getByText(/NEW IDEA/);
      const modalElement = screen.queryByTestId('new-idea-modal');
      const overlay = screen.getByTestId("modal-overlay"); 
      
      ///WHEN 
      fireEvent.click(buttonElement);     //-Simulate opening the modal
      fireEvent.click(overlay);           //-Simulate a click outside event modal
      
      ///THEN: check that modal closed
      expect(modalElement).toHaveClass('opacity-0');
   });
});

describe("Testing Theme DropDown Functionality", () => {
   ///TEARUP
   beforeEach(() => {
      render(<ModeToggle />);
   });

   //type INTEGRATION ✔
   it("renders dropdown button", () => {
      const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
      expect(toggleButton).toBeInTheDocument();
   });
   
   //type INTEGRATION ✔
   it("opens dropdown menu on click", async () => {
      const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
      await userEvent.click(toggleButton);
    
      const dropdownMenu = screen.getByRole("menu"); // Updated role value
      expect(dropdownMenu).toBeInTheDocument();
   });
   
   //type INTEGRATION ✔
   it("check dropdown menu renders with all options", async() => {
      const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
      await userEvent.click(toggleButton);
    
      const lightModeButton = screen.getByTestId("light-mode-button");
      const darkModeButton = screen.getByTestId("dark-mode-button");
      const systemModeButton = screen.getByTestId("system-mode-button");
    
      expect(lightModeButton).toBeInTheDocument();
      expect(darkModeButton).toBeInTheDocument();
      expect(systemModeButton).toBeInTheDocument();
   });

   //type INTEGRATION ✔
   it("check that theme renders with 'system' by default", async() => {      
      const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });
      expect(result.current.theme).toBe("system"); 
   });
});
