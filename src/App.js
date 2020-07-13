import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import NavBar from "./components/NavBar";

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Switch>
                    <Route path="/settings">
                        <Typography component="h2">Settings</Typography>
                    </Route>
                    <Route path="/">
                        <Typography component="h2">Home</Typography>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
