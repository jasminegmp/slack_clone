import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path = {`${process.env.PUBLIC_URL}/`} component = {App} />
            <Route path = {`${process.env.PUBLIC_URL}/login`}component = {Login} />
            <Route path = {`${process.env.PUBLIC_URL}/register`} component = {Register} />
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

