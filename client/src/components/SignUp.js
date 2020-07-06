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
      if ((userName.length < 5) || (password.length < 8)) {
        return;
      }
      this.checkUserNameQuery(userName, password, this.props.history);
    }

    checkUserNameQuery(userName, password, history) {
      //console.log('processing...');
      axios({
        method: 'get',
        timeout: 5000,
        url: `http://localhost:5000/users/userExists/${userName}`
      }).then(res => {
        //console.log(res.status === 204);
        if(res.status === 204) {
          this.signUpQuery(userName, password, history);
        } else {
          alert(`Username ${userName} taken, please consider another username.`);
        }
      }).catch(error => {
        alert('Sorry could not perform registration, please try again later101');
      });
    }

    signUpQuery(userName, password, history) {
      axios({
        method: 'post',
        url: 'http://localhost:5000/users/addUser',
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
          alert('Sorry could not perform registration, please try again later102');
          return;
        }
        if (res.status === 201) {
          alert('User successfully registered!');
          history.goBack();
          return;
        }
      }).catch(error => {
        console.log(error);
        alert('Sorry could not perform registration, please try again later103');
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