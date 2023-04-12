# TASKS

A to-do app interview exercise from [ZST Technologies](http://www.zst.ng).

## About

This to-do application is a simplified version of the Google Tasks Todo app, which enables you to create a list of tasks that you want to accomplish.

## Description

The implementation should include the following:

- A **“No tasks yet”** screen that displays when there are no tasks available in a list.
- An **“All tasks completed”** screen that displays when all tasks in a list have been completed.
- A screen that displays a list of to-do items, a nav bar, and a bottom bar.
- A nav bar that contains **“starred”** list items, other created list items, and a **“new list”** button to create a new list.
- A modal that pops up when you want to create a new task. The modal should consist of the following:
  - An input field for the title of the task.
  - An input field for the description of the task.
  - A selector for the due date of the task.
- Navigating (through swipe) from one (tasks) list to another.
- Creating a task using the button on the bottom bar.
-

## Requirements

- Use functional components and hooks to manage state.
- Use React Native's FlatList component to display the list of items.
- Use Redux to manage the application's state.
- Implement basic error handling to prevent the app from crashing due to errors.
- Push the code to a GitHub repository.

## Technologies

- [React Native](https://reactnative.dev/) will be used for the development environment.
- [Redux](https://redux.js.org/) and its ecosystems will be utilized for state management.
- [Native Base](https://nativebase.io/) is the utility-first component library that will be used for building consistent UI across platforms.
- [React Navigation](https://reactnavigation.org/) is the library that will be used for navigating between screens.
- [Moment](https://momentjs.com/) will be used for parsing, validating, manipulating,
  and displaying dates and times in JavaScript.

## Setup

- To get started, download or clone the [repository](https://github.com/HERYORDEJY-DEV/Tasks) by following these steps:
  - Open a terminal and run `git clone https://github.com/HERYORDEJY-DEV/Tasks.git HERYORDEJY`
- Next, navigate to the cloned project directory in the emulator by running `cd HERYORDEJY` in the terminal.
- Run `yarn install` to install all the dependencies required by the project.
- To launch the app on an Android emulator, run `npx react-native run-android`.
- For iOS, run `npx pod-install` to install the necessary CocoaPods dependencies, and then run `npx react-native run-ios` to start the app on an iOS emulator.
-

## Project structure

- src/
  - assets/
    - fonts/
    - images/
    - svgs/
    - `index.ts `
  - components/
    - General/
    - NavBar/
    - Tab/
    - Task/
  - hooks/
  - navigation/
    - `index.tsx`
  - screens/
    - Tasks/
  - store
    - Slice/
      - `reducers.ts`
    - Types
    - `index.ts`
  - theme/
    - `index.ts`
  - utils/

## Approach

- Firstly, I carefully reviewed the assessment documentation to ensure I understood the requirements before planning my approach to the task.
- Next, I set up my development environment using the React Native CLI, which is my preferred choice.
- I then installed all the necessary packages listed in the `package.json` file in the project's root directory.
- Following the assessment's outline, I gradually implemented the app, ensuring I met all requirements as stated in the documentation.
- I tested the app on an iOS simulator and an iPhone device, as I develop on a MacBook. I also searched for an Android device to test and ensure the app works seamlessly on both platforms.
- Afterwards, I prepared the project documentaion - the `README.md` file.
- Finally, I pushed the code to the GitHub repository.

## Challenges

I'd say the most difficult part of the project was creating the arc-shaped point for the bottom bar. Unlike previous bottom bars I've implemented, this one required some research due to its unique shape. After some investigation, I found that using SVG would be the best approach. However, I'm not an expert in building SVG shapes, so it took some time to achieve my goal.
