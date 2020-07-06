import React from 'react';
import UserPrompt from './UserPrompt';
import axios from 'axios';

class SignUp extends React.Component {
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
      this.props.history.goBack();
    }

    onButtonClick() {
      const userName = this.state.username;
      const password = this.state.password;
      const validUserName = this.checkUserNameQuery(userName);

      if (validUserName === 1) {
        this.signUpQuery(userName, password);
      }
      if (validUserName === 0) {
        alert(`Username ${userName} taken, please consider another username.`);
      }
    }

    checkUserNameQuery(userName) {
      axios({
        method: 'get',
        timeout: 5000,
        url: `localhost:5000/users/userExists/${userName}`
      }).then(res => {
        if(res.status === 404) {
          return 1;
        } else {
          return 0;
        }
      }).catch(error => {
        alert('Sorry could not perform registration, please try again later');
        return 2;
      });
    }

    signUpQuery(userName, password) {
      axios({
        method: 'post',
        url: 'localhost:5000/users/addUser',
        timeout: 5000,
        data: {
          userName: userName,
          password: password
        }
      }).then(res => {
        if (res.status === 400) {
          alert('Bad fields for username and passoword provided.');
          return;
        }
        if (res.status === 500) {
          alert('Sorry could not perform registration, please try again later');
          return;
        }
        if (res.status === 201) {
          alert('User successfully registered!');
          this.state.history.goBack();
          return;
        }
      }).catch(error => {
        alert('Sorry could not perform registration, please try again later');
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
         onLinkClick = {this.onLinkClick}
         onButtonClick = {this.onButtonClick}
        />
      );
    }
}

export default SignUp;