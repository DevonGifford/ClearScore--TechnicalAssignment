import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { RenderResult, fireEvent, render, renderHook } from '@testing-library/react'

import { ThemeProvider, useTheme } from '@/components/theme/theme-provider';


describe("Testing ThemeProvider and Theme Functionality", () => {
   ///TEARUP
   let getByText: RenderResult['getByText'];
   beforeEach(() => {
   //- Set up the TestComponent and render it within ThemeProvider
      const TestComponent = () => {
         const { theme, setTheme } = useTheme();
         return (
            <div>
            <p>Current theme: {theme}</p>
            <button onClick={() => setTheme("dark")}>Change to Dark</button>
            <button onClick={() => setTheme("light")}>Change to Light</button>
            <button onClick={() => setTheme("system")}>Revert to System</button>
            </div>
         );
      };
      //- Render the TestComponent within ThemeProvider
      const renderResult = render(
         <ThemeProvider>
            <TestComponent />
         </ThemeProvider>
      );
      //- Destructure getByText from the render result
      getByText = renderResult.getByText;
   });

   ///TEARDOWN
   afterEach(() => {
      //- Reset the theme to the default value after each test
      window.sessionStorage.removeItem("vite-ui-theme");
   });
  
   //test UNIT-TEST ✔
   it("retrieves the theme correctly and updates to dark", () => {
      //- Initial theme
      expect(getByText("Current theme: system")).toBeInTheDocument();

      //- Change the theme to Dark
      const changeButton = getByText("Change to Dark");
      fireEvent.click(changeButton);
      expect(getByText("Current theme: dark")).toBeInTheDocument();
   });

   //test UNIT-TEST ✔
   it("retrieves the theme correctly and updates to light", () => {
      //- Existing theme
      expect(getByText("Current theme: system")).toBeInTheDocument();

      //- Change the theme to Light
      const changeLightButton = getByText("Change to Light");
      fireEvent.click(changeLightButton);
      expect(getByText("Current theme: light")).toBeInTheDocument();
   });

   //test UNIT-TEST ✔
   it("retrieves the theme correctly, update and revert back to system", () => {
      //- Existing theme
      expect(getByText("Current theme: system")).toBeInTheDocument();

      //- Change the theme to Light
      const changeLightButton = getByText("Change to Light");
      fireEvent.click(changeLightButton);
      expect(getByText("Current theme: light")).toBeInTheDocument();

      //- Revert back to system 
      const changeBackToSystem = getByText("Revert to System")
      fireEvent.click(changeBackToSystem);
      expect(getByText("Current theme: system")).toBeInTheDocument();
   });
 });
 

describe("Testing the useTheme Hook", () => {
   //test UNIT-TEST ✔
   it("returns the correct theme and setTheme function", () => {
      const wrapper = ({ children }: {children: React.ReactNode}) => (
         <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("system");
      expect(typeof result.current.setTheme).toBe("function");
   });
});