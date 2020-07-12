import React from 'react';
import axios from 'axios';
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
      const userName = this.state.username;
      const password = this.state.password;
      if ((userName.length < 5) || (password.length < 8)) {
        return;
      }
      this.loginQuery(userName, password, this.props.history);
    }

    loginQuery(userName, password, history) {
      axios({
        method: 'post',
        timeout: 5000,
        url: '/users/getUser',
        data: {
          userName: userName,
          password: password,
        }
      }).then(res => {
        if(res.status === 204) {
          alert('Username and/or password is incorrect.');
        } else {
          history.push('/dashboard', res.data);
        }
      }).catch(error => {
        console.error(error);
        if (error.response.status === 403) {
          alert('Username and/or password is incorrect.');
        } else {
          alert('Cannot perform login at this time, please try again later.');
        }
      });
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
