import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import firebase from './Firebase';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';


class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                //console.log(user);
                this.props.history.push('/');
            }
        })
    }
    render(){
        return (
            <Switch>
                <Route exact path = {`${process.env.PUBLIC_URL}/`} component = {App} />
                <Route path = {`${process.env.PUBLIC_URL}/login`}component = {Login} />
                <Route path = {`${process.env.PUBLIC_URL}/register`} component = {Register} />
            </Switch>
        )
    }
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(
    <Router>
        <RootWithAuth />
    </Router>
, 
document.getElementById('root'));

