# Typosecript & Redux Todo

- Everyone has a simple React todo app. Apparently, it's the law. Here's one using Typescript, Redux, and Redux-Toolkit. Styling uses Tailwind.
- The app stores all todo items to local storage for ease of use without the need for external services.

## Project Setup for Redux & Typescript

### Installing Typescrupt, CRA, Redux, Redux-Toolkit

- Use this command to create a new typescript-based Create React App
  - `npx create-react-app ts-react --template typescript`
- Install Redux & Redux Toolkit
  - `npm i react-redux @reduxjs/toolkit`
- Create your basic types, generics and your Todo type, in src/types.d.ts
- Create a store directory in the project src
  - Create a slice file:
    - Create a type for your slice's state
    - Set the initial state
    - Use createSlice to instantiate your slice of state
    - Create reducers, export the actions
      - No need to make action-creators
  - Create a store.ts file
    - Imports configureStore and your slice files
    - Creates store with configureStore to bind it all together
  - Create a reactHooks file
    - Pull in RootState and dispatch from your store
    - Export store-specific useDispatch and useSelector hooks
  - In your index.ts, wrap your app in a Provider with your store as a prop
  - Load the app in a browser with the Redux Chrome extension, you'll be able to see your store with the initial state.

### Tailwind setup:

- Install Tailwind
  - `npm install -D tailwindcss postcss autoprefixer`
- Create the Tailwind config file:
  - `npx tailwindcss init -p`
- Add this to tailwind config:

```
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
```

- in index.css, add the following:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Add a class to your app component like bg-red-500 to confirm that Tailwind is working properly.

### Feature: Todo Create/Delete/Complete

- In your slice, create a reducer for saveTodo and another one called deleteTodo
  - These create a new copy of your state with the updated data.
  - create a some helper functions.
    - One to create ID hashes
    - One to clean text input of linefeeds
- Create a TodoInput component with an input.
- Create a new Delete button and a new complete button.
  - Complete button displays a checkmark SVG icon when the isCompleted on the todo is true.
- Import your useReducer and create a function that dispatches to saveTodo reducer with the text of your todo's title.
  - Also, create a function that deletes a todo from state based on the ID of the todo where the delete button was clicked.
- Create a TodoDisplay component
  - Display the title, the title and the complete button
- Create a TodoList component and maps through components. Eventually we will filter these, but we don't have enough information to do this now. This component will display a TodoDisplay component for each Todo item.
  - Pass the delete function to your delete button
  - Pass the toggle complete function to your complete button
- Create a CompletionStats component
  - Create a helper function to get the number of completed todos vs. the total number of todos
  - Add the function to your app.tsx component
- Create saveToStorage and loadFromStorage helper functions
  - Add the save function calls to your slice's reducers
  - Add the load function to your slice's initialState object
  - Add some todos and refresh the page. Now you have simple persistence.

### Feature: Inline Editing

- Add reducers to the todo slice:
  - updateTodoTitle - updates the title of the todo with an ID matching the selectedTodoId value in state
  - selectTodoTitleForEdit - updates isEditingTodoTitle in state and sets to the ID of the todo that was clicked
  - setTodoTitleEditComplete - cancels title editing mode, sets isEditingTodoTitle to false
- Create a TodoTitleInput component with an input, cancel and OK buttons
  - Hook up an onKeydown to listen for enter or escape
  - A useState instance tracks the value of the input
  - The OK button fires the dispatch for updateTodoTitle
  - The cancel button fires the dispath for setTodoTitleEditComplete
- Test to make sure inline editing is working properly

### Feature: Tags & Filtering

- Create a reusable Modal component with a close button and a handleClose prop function
- Create two new components that use this Modal, one to add tags and one to filter todos.
- add some new helper functions:
  - getTagsFromTodos - extracts in a list of active tags from the todos list
  - getTagsFromStorage - pulls in a list of active tags from stored todos
- Add todo slice reducers:
  - addTag - adds a tag to the selected todo ID
  - deleteTag - removes a tag from the selected todo ID
  - setTagModalOpen - set the tag modal open value in state
  - setHideCompleted - sets the hideCompleted value in state
  - setTagFilter - sets the tag filter value to the string of the selected tag
  - setFilterModalOpen - set the filter modal open value in state
- In TodoList, add a filter before mapping through the todo items that filters out completed items if the hideCompleted value is set to true in global state
  - Also, add a filter that matches on tags if the tag filter value is set in global state.

### Feature: Darkmode

- Add some new helper functions
  - getInitialDarkmode - grab the browser's preferred setting for darkmode if a local storage value is not set.
  - setDarkModeClass - add or remove a "dark" class to the page's html tag.
  - processDarkModeChange - store the darkmode value to local storage and call setDarkmodeClass
- Create a new slice file for darkmode
  - The only reducer we need is setDarkMode
    - Also call the processDarkModeChange function
  - Use getInitialDarkmode to set your darkmode slice's initialState
- Create a darkmode toggle component
  - Add a function to dispatch to setDarkmode when the component is clicked
- In your tailwind config, add the following line just below your content section: `darkMode: 'class',`
- Set some values in Tailwind to test this. Add a "dark:" to a background class, such as "bg-gray-600 dark:bg-gray-900"
  - With darkmode enabled, you should be able to see the change

### Testing

- You can fake out state by mocking localstorage getItem
- Some have recommended testing with real state rather than mock state, so you can do this by wrapping your test renders in `<Provider store={store}>`
- The randomized ID hashes will cause issues with snapshot tests, so you can test the function for creating them separately and avoid snapshots or mock Math.random if you want.

### Conclusion

- Redux-Toolkit makes Redux far less painful than it used to seem.
- And Typescript really helps keep me from getting wires crossed when my data structures evolve during development.
- Notes for setup, etc. are in the git repo, link in the description.
- Our app is full-featured, but there are some other things we could add, I'm sure. What would you like to see? Please let me know in the comments.

---

# Dev Process

- [x] Feature: Todos
  - [x] Add input for todos and button to save them
    - [x] Add enter key support
  - [x] Configure redux and add slice via redux-toolkit for todos
  - [x] Save new todo items to redux
  - [x] Save data to local storage
  - [x] Read todos from local storage on init
  - [x] Allow inline-editing of toto titles by clicking on text
- [x] Feature: Tags
  - [x] Add updateTag action to the todo Redux slice
  - [x] On startup, compile list of all tags from local storage and store in tags list in state
  - [x] Allow a user to add an existing tag to a todo
    - [x] Add a list of tags to the initial state on the todos Redux slice
  - [x] Allow a user to create a tag if one does not exist
  - [x] Store a list of tags to localstorage or calculate it from all todos on startup
  - [x] Allow the user to select a tag from a list or select no tag for viewing associated todos
- [x] Feature: Darkmode
  - [x] Add new slice for darkmode
  - [x] Create button to toggle darkmode
  - [x] Add "dark" class when darkmode is enabled
  - [x] Connect "dark" class to Tailwind Config
  - [x] Go through color choices and add darkmode versions for each
  - [x] Add function to detect browser's native dark mode preference and save to initial state
  - [x] Read/save selections to localstate and only use browser's native drark mode preference if setting is not set in local storage
- [x] Feature: Filters
  - [x] Add filter for "hide completed"
  - [x] Add filter for all existing tags
  - [x] Add button to clear all local data
