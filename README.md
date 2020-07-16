# Address book app

This is a fictional address book app, where you can search for users addresses and
personal information. The app displays a list of users for the end user to browse and
get personal information for a selected user, where you can also select via a settings page
which nationalities you're interested in.

## Run the application

### Pre-Requisites
Install Node.js and npm according to the official documentation [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Run a production build locally

1. Execute ```npm install``` in terminal to download all required dependencies
2. Execute ```npm run build-serve``` in terminal to create a production optimized build and statically serve it on port 4000
3. Open provided URL, most likely [http://localhost:4000](http://localhost:4000) in your preferred browser

(!) If port 4000 is already in use / cannot be used, consider doing the following steps instead:
 serve -s build -l 4000
1. Execute ```npm install``` in terminal to download all required dependencies
2. Execute ```npm run build``` in terminal to create a production optimized build
3. Execute ```serve -s build -l PORT``` where PORT shall represent your preferred port, eg. 3200
4. Open provided URL `http://localhost:PORT`

### For development with continuous file serve
1. Execute ```npm install``` in terminal to download all required dependencies
2. Run ```npm run start``` to trigger the build and serve the files continuously.
3. Await for your browser to open on [http://localhost:3000](http://localhost:3000)

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

## Redux State Management Debug
Provided your are using Chrome, install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) extension from Chrome Web Store.
This allows you to debug state changes in real time for an app being served locally.

## Dependencies

### Core
- React - Core Framework
- React-Redux - for state management going beyond React Hooks
- Redux-Thunk - for asynchronous actions relying on state
- React-Scripts - using Webpack, Babel, Jest, ESLint and alike under the hood - see [https://www.npmjs.com/package/react-scripts](https://www.npmjs.com/package/react-scripts)
- Cross-Fetch - for making HTTP-Requests to the REST-API
- Material-UI - UI Framework
- React-Toast-Notifications - Library introducing useToasts hook to show notifications as toasts in UI

### Utilities
- Serve - to statically serve your build folder

### Testing
- ESLint - for static code analysis and common code style among development team
- Jest - Testing Framework for React apps
- Redux Mock Store - to facilitate unit testing with Redux
