import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import CocktailBuilder from "./containers/CocktailBuilder/CocktailBuilder";
import CocktailPage from "./containers/CocktailPage/CocktailPage";
import MyCocktails from "./containers/MyCocktails/MyCocktails";

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
                <ProtectedRoute
                    isAllowed={user}
                    path="/cocktails/:id"
                    exact component={CocktailPage}
                    redirectTo="/login"
                />
                <ProtectedRoute
                    isAllowed={user}
                    path="/my_cocktails"
                    exact component={MyCocktails}
                    redirectTo="/login"
                />
                <Route path="/login" component={Login}/>
            </Switch>

        </Layout>
    );
};

export default App;