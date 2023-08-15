<!-- Introduction Text -->
<div align="center">
    <h1>IdeaBank</h1>
    <h4>(Technical Take-Home Assaignment)<h4>
    <h3> 
      <a href='https://idea-board-murex.vercel.app/', target='_blank'>
        <h5>live demo</h5>
      <a/>
    </h3>
        <h6>
            built with <a href="https://vitejs.dev/" >Vite</a> &
            hosted by <a href="https://vercel.com/">Vercel</a> 
        </h6>
</div>

---

<h3 align='center'>
Tech Used in this Project
<h3>
<p align='center'>
    <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=ts,vite,tailwind" /><br>
        <img src="https://skillicons.dev/icons?i=vercel,github,jest" />
    </a>
</p>

---

<!-- Logo -->
<div align=center>
    <img src="/src/assets/fullpage.png" alt="Demo" title="DemoImage" width="380" height="320">     
   
</div>

<br>

<!-- -------------------------------------------------------------------------- -->

<h1 align='center'> Welcome & Introductory </h1>

<!-- -------------------------------------------------------------------------- -->

### Brief Introduction:

<!-- -------------------------------------------------------------------------- -->
<hr/>

Welcome to the behind the scennes of Idea Bank, where innovation comes to life!
A dynamic and interactive web application designed to streamline creativity & ideation management.

Crafted with care using Vite and React, embracing contemporary modern web development practices to provide users with a seamless experience for smooth brainstorming, efficient organization, and effortless idea editing.

It not only fulfills the core requirements set in the task descriptions, such as; responsive design, sorting options, and inline editing—but goes beyond with stretch goals, including; a character countdown and unobtrusive notification

To take things a step further I also added some additional features, such as basic dark/light theme's.  
<br>

**Please Note: This was part of a take home technical assaignment.**

You can learn more about the task requirements here:<br>

- [Task Requirements](https://github.com/ClearScore/tech-screen/tree/master/idea-board)<br>
- [More Requirements](https://github.com/ClearScore/tech-screen#what-were-looking-for)

<br>

#### 🔑 Key-Required Features of this project:

<!-- -------------------------------------------------------------------------- -->
<hr>

<!-- Small container -->
<details>
<summary> Click here to expand</summary>
<br/>

<div>

<h3> REQUIRED FEATURES: </h3>
<hr>

✅ Page should be fully responsive.

✅ Each idea tile should contain a title and description

✅ CRUD Functionality

✅ Inline edit ideas

✅ Created/Updated time.

✅ New ideas should have the title field focused to prompt user to begin typing.

✅ Add the ability to sort ideas by creation date or alphabetically.

<h3> STRETCH FEATURES: </h3>

<hr>

✅ Utilise the localStorage API to persist current state when the page is refreshed.

✅ Add a character countdown as the user is approaching the limit of their description text.

✅ Add an unobtrusive notification when an update is made to a tile.

<h3> BONUS FEATURES: </h3>

<hr>

✅ Created a Navbar

✅ Light and Dark Themes

✅ Filter Functionality

<h3> What we're looking for: </h3>

<hr>

✅ A stylish solution

✅ Demonstration of CSS knowledge

✅ Isomorphic / Universal SPA

✅ ES6 and ES7 throughout the codebase

✅ PostCSS

✅ A live site hosted

✅ A detailed README explaining assumptions / decisions

💨 Clean, concise code <br>
_room for improvement in this regard ..._

❌ Jest + Vitest for testing <br/>
_coming soon ..._

❌ MEN (Mongo, Express, Node) stack websites <br>
_This proof of concept doesn't have a dedicated backend and instead uses a serverless PostgreSQL database ..._

❌ We build using the Webpack module bundler and Lerna package manager <br/>
_This app uses vite and thus uses it's own ezbuild bundler/builder ..._

</div>

<!-- CLOSING DIV -->
</details>
<br/>

#### 🎯 Known issues and improvements coming:

<!-- -------------------------------------------------------------------------- -->
<hr>

<!-- Small container -->
<details>
<summary> Click here to expand</summary>
<br/>

<div>

<h3> Known issues: </h3>
<hr>

💥 Submit and Delete funcitonality needs to use an optomistic ui as apart from making new api call

💥 Functionality to revert changes if user clicks off editing an idea card

💥 Editing cards while data is sorted causing problem with character counter

💥 Creating ideas via modal has a notification issue.

<h3> Future Features & Improvements: </h3>
<hr>

💥 Updating/Editing 2 cards at the same time, should reset the editing of the first card

💥 Visual indication to users about the currently selected sorting option.

💥 Filter for ideas created Today, This Week and This Month

</div>

<!-- CLOSING DIV -->
</details>
<br/>

#### 📚 Libraries used in this project:

<!-- -------------------------------------------------------------------------- -->
<hr>

<!-- Small container -->
<details>
<summary> Click here to expand </summary>
<br/>

Certainly! Here's the list of packages along with descriptions in raw GitHub markdown:

markdown
Copy code
**Dependencies:**

1. `@hookform/resolvers`: Validation resolvers for React Hook Form.
2. `@radix-ui/react-dropdown-menu`: Component library for creating dropdown menus.
3. `@radix-ui/react-progress`: Component library for rendering progress bars.
4. `@radix-ui/react-slot`: Component library for managing slots in UI components.
5. `class-variance-authority`: A utility for managing CSS class variance.
6. `clsx`: Utility for conditionally joining classNames together.
7. `lucide-react`: Icon component library for SVG icons.
8. `react`: JavaScript library for building user interfaces.
9. `react-dom`: React package for working with the DOM.
10. `react-hook-form`: Library for managing form state and validation in React.
11. `react-hot-toast`: Library for displaying toasts and notifications.
12. `tailwindcss-animate`: Tailwind CSS plugin for adding animations.
13. `zod`: TypeScript-first schema validation.

**Dev Dependencies:**

1. `@types/node`: TypeScript definitions for Node.js.
2. `@types/react`: TypeScript definitions for React.
3. `@types/react-dom`: TypeScript definitions for ReactDOM.
4. `@typescript-eslint/eslint-plugin`: ESLint plugin for TypeScript.
5. `@typescript-eslint/parser`: ESLint parser for TypeScript.
6. `@vitejs/plugin-react`: Vite plugin for React integration.
7. `autoprefixer`: PostCSS plugin for adding vendor prefixes.
8. `eslint`: Linter tool for identifying and fixing problems in your code.
9. `eslint-config-prettier`: ESLint configuration to disable rules that conflict with Prettier.
10. `eslint-plugin-react-hooks`: ESLint plugin for enforcing React Hooks rules.
11. `eslint-plugin-react-refresh`: ESLint plugin for integrating React Fast Refresh.
12. `postcss`: Tool for transforming styles with JavaScript plugins.
13. `prettier`: Opinionated code formatter to maintain consistent code style.
14. `tailwind-merge`: Tailwind CSS plugin for merging styles.
15. `tailwindcss`: Utility-first CSS framework for building modern web applications.
16. `typescript`: Superset of JavaScript that includes static types.
17. `vite`: Build tool that provides fast development and build times.

<!-- CLOSING DIV -->
</details>

<br><br>

<!-- -------------------------------------------------------------------------- -->

<h1 align='center'> Development Thought Process </h1>

<!-- -------------------------------------------------------------------------- -->

## <font color=EEE8AA>App.tsx :</font>

<!-- -------------------------------------------------------------------------- -->

<!-- Small container -->
<details>
<summary> Click here to expand </summary>
<br/>
### <font color=#d48d57>Separation of concerns</font>

If this were not a technical test I would have most likely had broken the app into smaller focused components.
But for the sake of a quick & easy code review, it's easier to keep things bundled together.

**Could have also moved the following into a separate utility functions:**

- Creating custom hook for reading/fetching LocalStorage data
- the _"CRUD"_ functionality
- Local Storage Management

### <font color=#d48d57>Avoiding State Management Library</font>

For a number of reasons I have decided to avoid using a state management library.  
Namely;

1.  Simplicity & keeping overhead down for code review
2.  Development speed for take home test
3.  The ease of testing and reviewing testing

### <font color=#d48d57>Very simple Key Generation</font>

Could have a more robust and unique key generation mechanism, however for the sake of development speed and as a proof of concept I opted to use something very simple yet guaranteed unique keys.

#### <font color=008080>Future Features: </font>

- Consider adding a library for key generation
- Moving the fetching of data into a custom hook

<!-- CLOSING DIV -->
</details>

<br>

## <font color=EEE8AA>IdeaBoard:</font>

<!-- -------------------------------------------------------------------------- -->

<!-- Small container -->
<details>
<summary> Click here to expand </summary>
<br/>

### <font color=#d48d57>Component Composition & Responsibility</font>

Once again, if this were not a technical test I would refactor this to break up the functionality into separate components.

_Fox example I could have the filter/sort functionality into it's own `<DropdownMenu />` component_

### <font color=#d48d57>Overall Accessibility</font>

As this is just a proof of concept I did not really focus on developing with accessibility in mind.

_For example. some things I would take into consideration across the entire app would be:_

- _ensure form fields, buttons, and other interactive elements are accessible for all users_
- _checking the colour contrast for text and backgrounds_
- _adding labels to the different form fields_

#### <font color=008080>Future Features: </font>

- Visual indication to users about the currently selected sorting option.
- Instead of using string-literals _(like `"date"` or `"alph"`)_ , would be better to have used an `enum`

<!-- CLOSING DIV -->
</details>

<br>

## <font color=EEE8AA>IdeaCard:</font>

<!-- -------------------------------------------------------------------------- -->

<!-- Small container -->
<details>
<summary> Click here to expand </summary>
<br/>

### <font color=#d48d57>Using react-hook-forms + zod </font>

- react-hook-forms brings some simplicity/performance and helps with minimizing any unnecessary re-renders
- `zod` library helps with the validation and keeping things type-safe, as well as error handling

In combination these work well together for implementing the inline editing functionality. Preventing the need for reloading entire form or page when user interacts with editing the cards

### <font color=#d48d57>Custom Character Countdown</font>

As a little bonus I added a 'stylish' character countdown that is only rendered if edits are being made to an `IdeaCard`.
This was relatively quick and easy to implement with the help of the shadcn UI library.

#### <font color=008080>Future Features: </font>

- Adding `onBlur` function to reset the edit's
- Creating a conditional render component if no ideas in LocalStorage.
- Possibly adding search functionality

#### <font color=FF0000>Known Issues:</font>

- Character Counter issue when using a filtered state and editing/updating the title (fixed)
- The edited should have used a timestamp inttead of the _yyyy-mm-dd_ format
- Creating a new card requires updating the card and therefore changes the created date to an edited date.

<!-- CLOSING DIV -->
</details>

<br>

## <font color=EEE8AA> NavBar & NewIdea-Modal:</font>

<!-- -------------------------------------------------------------------------- -->

<!-- Small container -->
<details>
<summary> Click here to expand </summary>
<br/>

### <font color=#d48d57>Part of prototyping attempt </font>

This was part of a very quick prototyping attempt, and it worked well enough that I decided to keep it in the app as a little bonus.

### <font color=#d48d57>Light & Dark Theme </font>

As this is very quick and easy to implement with the help of the shadcn UI library, I decided to add it for a bit of style and flare reasons.
I further also amended this feature to instead use the Session Storage so as not to have any conflict with the ideas stored in LocalStorage.

### <font color=#d48d57>Generating Fake/Test Ideas</font>

I wanted to create a method for the code-reviewer to create a way to generate a range of ideas, in order to easily test the functionality of the LocalStorage CRUD functionality, as well as test the sorting functionality.

#### <font color=008080>Future Features: </font>

- Adding the custom character count as part of the form

#### <font color=FF0000>Known Issues:</font>

- Not using the newly created create idea function, rather directly pushing new idea into LocalStorage
- This is not efficient and requires breaking the notification and doing a page refresh.

<!-- CLOSING DIV -->
</details>

<br>
