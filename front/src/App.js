import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import CocktailBuilder from "./containers/CocktailBuilder/CocktailBuilder";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <ProtectedRoute
                    isAllowed={user}
                    path="/"
                    exact component={CocktailBuilder}
                    redirectTo="/login"
                />
                <Route path="/login" component={Login}/>
            </Switch>

        </Layout>
    );
};

export default App;