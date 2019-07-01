import React from 'react';
import {Grid, Form, Segment, Header, Button, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../Firebase';
import md5 from 'md5';

class Register extends React.Component{

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        error: '',
        loading: false,
    };

    isFormValid = () => {
        if (this.isFormEmpty(this.state)){
            // throw error
            const currentError = {message: 'Fill in all fields'};
            this.setState({error: currentError});
            return false;
        }
        else if (!this.isPasswordValid(this.state)){
            // throw error
            const currentError = {message: 'Password Invalid'};
            this.setState({error: currentError});
            return false;
        }
        else{
            return true;
            // form value, return trun
        }
    }

    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if (password.length < 6 || passwordConfirmation.length < 6){
            return false;
        }
        else if (password !== passwordConfirmation){
            return false;
        }
        else{
            return true;
        }
    }

    displayError = (error) => {
        return <p>{error.message}</p>
    } 

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()){
            this.setState({error: '', loading: true});
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser) ;
                    const hash = md5(createdUser.user.email);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${hash}?d=identicon`
                    })
                    .then(() => {
                        this.setState({loading: false});  
                        
                    })
                    .catch (err => {
                        console.error(err);
                        this.setState({error: err, loading: false});
                    })
                     
                })
                .catch(err => {
                    console.error(err);
                    this.setState({error: err, loading: false});
                })    
        }


    }

    render(){
        const {username, email, password, passwordConfirmation, error, loading} = this.state;
        return (
            <Grid textAlign = "center" verticalAlign = "middle" className = "app">
                <Grid.Column style = {{maxWidth: 450}}>
                    <Header as="h2" icon color = "blue" textAlign = "center">
                        <Icon name = "talk" color = "blue" />
                        Register for GumpChat
                    </Header>
                    <Form onSubmit = {this.handleSubmit} size = "large">
                        <Segment stacked>
                            <Form.Input fluid name = "username" 
                                        icon = "user" 
                                        iconPosition ="left" 
                                        placeholder="Username" 
                                        onChange = {this.handleChange}
                                        type = "text"
                                        value = {username}
                            />
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
                            <Form.Input fluid name = "passwordConfirmation" 
                                        icon = "lock" 
                                        iconPosition ="left" 
                                        placeholder="Password Confirmation" 
                                        onChange = {this.handleChange}
                                        type = "password"
                                        value = {passwordConfirmation}
                            />
                            <Button className = {loading ? 'loading': ''} disabled = {loading} color = "blue" fluid size ="large">Submit</Button>
                        </Segment>
                    </Form>
                    {(error && 
                        (<Message error>
                            <h3>Error</h3>
                            {this.displayError(error)}
                        </Message>)
                    )}
                    
                    <Message>Already a user? <Link to = "Login">Login</Link></Message>

                </Grid.Column>

            </Grid>
        )
    }
}

export default Register;