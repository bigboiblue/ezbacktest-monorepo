
import React, { useContext } from "react";
import ReactDom from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
    BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import GlobalStyle from "./styles/GlobalStyle";
import allReducer from "./reducers/index";
import "@babel/polyfill";
import { ThemeContext } from "./styles/GlobalUserTheme";


import Home from "./components/Home";


function App(): React.ReactElement {
    let theme = useContext(ThemeContext);
    let storeEnhancers = compose(
        applyMiddleware(thunk),
        // @ts-ignore //
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    let store = createStore(allReducer, storeEnhancers);


    // eslint-disable-next-line react/prop-types
    let Providers = ({ children }): React.ReactElement => (
        <StylesProvider injectFirst>
            <GlobalStyle />
            <Provider store={store}>
                <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
            </Provider>
        </StylesProvider>
    );

    return (
        <Providers>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                </Switch>
            </Router>
        </Providers>
    );
}
ReactDom.render(<App />, document.getElementById("app"));
