import React from 'react';
import {Grid, Form, Segment, Header, Button, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../Firebase';

class Login extends React.Component{

    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };

    displayError = (error) => {
        return <p>{error.message}</p>
    } 

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid(this.state)){
            this.setState({error: '', loading: true});
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log("logged in: ", signedInUser);
                })
                .catch(err => {
                    this.setState({
                        error: err,
                        loading: false
                    })
                });
        }


    }

    isFormValid = ({email, password}) => email && password;
    

    render(){
        const {email, password, error, loading} = this.state;
        return (
            <Grid textAlign = "center" verticalAlign = "middle" className = "app">
                <Grid.Column style = {{maxWidth: 450}}>
                    <Header as="h2" icon color = "pink" textAlign = "center">
                        <Icon name = "talk" color = "pink" />
                        Login to  GumpChat
                    </Header>
                    <Form onSubmit = {this.handleSubmit} size = "large">
                        <Segment stacked>
                            <Form.Input fluid name = "email" 
                                        icon = "mail" 
                                        iconPosition ="left" 
                                        placeholder="Email Address" 
                                        onChange = {this.handleChange}
                                        type = "email"
                                        value = {email}
                            />
                            <Form.Input fluid name = "password" 
                                        icon = "lock" 
                                        iconPosition ="left" 
                                        placeholder="Password" 
                                        onChange = {this.handleChange}
                                        type = "password"
                                        value = {password}
                            />
                            <Button className = {loading ? 'loading': ''} disabled = {loading} color = "pink" fluid size ="large">Submit</Button>
                        </Segment>
                    </Form>
                    {(error && 
                        (<Message error>
                            <h3>Error</h3>
                            {this.displayError(error)}
                        </Message>)
                    )}
                    
                    <Message>Don't have an account?<Link to = "/register"> Register</Link></Message>

                </Grid.Column>

            </Grid>
        )
    }
}

export default Login;