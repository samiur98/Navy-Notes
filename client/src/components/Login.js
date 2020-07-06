import React from 'react';
import UserPrompt from './UserPrompt';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      };
      this.onUserNameChange = this.onUserNameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
      this.onLinkClick = this.onLinkClick.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
    }
    
    onUserNameChange(event) {
      const newUserName = event.target.value;
      this.setState(prevState => {
        return{
          username: newUserName,
          password: prevState.password
        };
      });
    }

    onPasswordChange(event) {
      const newPassword = event.target.value;
      this.setState(prevState => {
        return{
          username: prevState.username,
          password: newPassword
        };
      });
    }

    onLinkClick() {
      this.props.history.push('/signup');
    }

    onButtonClick() {
      console.log('Button Pressed');
    }

    render() {
      return(
        <UserPrompt 
        username = {this.state.username}
        password = {this.state.password}
        buttonText = "LOGIN"
        linkText = "Sign Up"
        onUserNameChange = {this.onUserNameChange}
        onPasswordChange = {this.onPasswordChange}
        onLinkClick = {this.onLinkClick}
        onButtonClick = {this.onButtonClick}
        />
      );
    }
}

  export default Login;
