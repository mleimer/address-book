import React, {useCallback, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';
import AddressBook from './features/AddressBook';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {makeStyles} from '@material-ui/core/styles';

const store = configureStore();


const useStyles = makeStyles(() => ({
    app: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 0,
        margin: 0
    },
    navigation: {
        flexGrow: 0
    },
    content: {
        position: 'relative',
        overflow: 'hidden',
        flexGrow: 1
    },
    innerContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto'
    }
}));

function App() {

    const classes = useStyles();

    const [isScrolledToBottom, setScrolledToBottom] = useState(false);

    /**
     * Reevaluates the scroll position and updates the isScrolledToBottom property with true
     * if the content is scrolled to the bottom, false otherwise.
     * Wrapped into useCallback function such that function can be passed to children
     * @type {function}
     */
    const reevaluateScrollPosition = useCallback(() => {
        let scrollableContent = document.getElementById('app-content');
        if (!scrollableContent) {
            return;
        }
        setScrolledToBottom(evaluateIfScrolledToBottom(scrollableContent));
    }, [setScrolledToBottom]);

    /**
     * Evaluates if passed HTML element is scrolled to the bottom
     * @param element - HTML-Element
     * @returns {boolean} - true if and only if scrollable content is scrolled to the bottom
     */
    const evaluateIfScrolledToBottom = (element) => {
        return element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight;
    };

    /**
     * Evaluates the scroll position of the underlying target element and ipdates the isScrolledToBottom property
     * to true if and only if that element had been scrolled to the bottom
     * @param event
     */
    const handleScroll = (event) => {
        setScrolledToBottom(evaluateIfScrolledToBottom(event.target));
    };

    return (
        <Provider store={store}>
            <Router>
                <div className={classes.app}>
                    <NavBar className={classes.navigation}/>
                    <div className={classes.content}>
                        <div className={classes.innerContent} id="app-content" onScroll={handleScroll}>
                            <Switch>
                                <Route path="/settings">
                                    <Typography component="h2">Settings</Typography>
                                </Route>
                                <Route path="/">
                                    <AddressBook isScrolledToBottom={isScrolledToBottom}
                                                 onRender={reevaluateScrollPosition}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
