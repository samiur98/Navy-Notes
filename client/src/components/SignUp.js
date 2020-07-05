import React from 'react';
import UserPrompt from './UserPrompt';

class SignUp extends React.Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: ''
      };
      this.onUserNameChange = this.onUserNameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
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

    render() {
      return(
        <UserPrompt
         username = {this.state.username}
         password = {this.state.password}
         buttonText = "SIGN UP"
         linkText = "Login"
         onUserNameChange = {this.onUserNameChange}
         onPasswordChange = {this.onPasswordChange}
        />
      );
    }
}

export default SignUp;