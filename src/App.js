import React from 'react';
import './Style.css';
import './components/login/LoginForm.css';
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/RegisterForm";
import './components/RegisterForm.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home'; // Make sure the path is correct

import TodoListPage from "./components/todolist/Todolistpage"; // Make sure the path is correct
// Import other components and routes as needed

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/loginform" component={LoginForm} />
                    <Route path="/registerform" component={RegisterForm} />
                    <Route exact path="/todos" component={TodoListPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
