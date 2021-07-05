import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateUserComponent from './components/CreateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import LoginUserComponent from './components/LoginUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import RegisterUserComponent from './components/RegisterUserComponent';
import HomeComponent from './components/HomeComponent';


function App() {
  return (
    <div>
      <Router>
        <HeaderComponent>
          <div className="nav">

          </div> 
        </HeaderComponent>
        <div className="container">
          <Switch> 
            <Route path = "/" exact component = {HomeComponent}></Route>
            <Route path = "/register" exact component = {RegisterUserComponent}></Route>
            <Route path = "/login" exact component = {LoginUserComponent}></Route>
            <Route path = "/users" exact component = {ListUserComponent}></Route>
            <Route path = "/add-user/:id" component = {CreateUserComponent}></Route>
            <Route path = "/view-user/:id" component = {ViewUserComponent}></Route>
            <Route path = "/update-user/:id" component = {UpdateUserComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>  
  );
}

export default App;