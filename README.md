# Typosecript & Redux Todo

- Everyone has a simple React todo app. Apparently, it's the law. Here's one using Typescript, Redux, and Redux-Toolkit. Styling uses Tailwind.
- The app stores all todo items to local storage for ease of use without the need for external services.

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

---
