import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Game from "../../pages/Game";
import Navbar from "../Navbar";

const Index = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/game" exact component={Game}/>
                <Route path="/profil" exact component={Profil}/>
                <Redirect to={"/"}/>
            </Switch>
        </Router>
    );
};

export default Index;