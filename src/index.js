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
import {Provider, connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./reducers"
import {setUser} from './actions';
import Spinner from './component/Spinner';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.props.setUser(user);
                this.props.history.push('/');
            }
        })
    }
    render(){
        return this.props.isLoading ? <Spinner/> :(
            <Switch>
                <Route exact path = {`${process.env.PUBLIC_URL}/`} component = {App} />
                <Route path = {`${process.env.PUBLIC_URL}/login`}component = {Login} />
                <Route path = {`${process.env.PUBLIC_URL}/register`} component = {Register} />
            </Switch>
        );
    }
}

const mapStateToProps =  state => ({
    isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser})(Root));

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>
, 
document.getElementById('root'));

