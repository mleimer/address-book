# Address book app

This is a fictional address book app, where you can search for users addresses and
personal information. The app displays a list of users for the end user to browse and
get personal information for a selected user, where you can also select via a settings page
which nationalities you're interested in.

## Run the app
1. Execute ```npm install``` in terminal to download all required dependencies
2. Run ```npm run start``` to trigger the build and starting the server. Await for your browser to open on [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Executes static code analysis on the source code

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Dependencies
- React (Core Framework)
- React-Redux (for state management going beyond React Hooks)
- Redux-Thunk (for asynchronous actions relying on state)
- React-Scripts (having the following dependencies among others:)
  - Babel
  - Webpack
  - Jest
  - ESLint
- Material-UI (UI Framework)
- React-Toast-Notifications (Library introducing useToasts hook to show notifications as toasts in UI)
- Cross-Fetch (for making HTTP-Requests to the REST-API)
- ESLint (for static code analysis and common code style among development team)
- Jest (Testing Framework for React apps)
- Redux Mock Store (to facilitate unit testing with Redux)
