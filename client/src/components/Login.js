import React from 'react';
import '../styles/Login.css';

class Login extends React.Component {

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

    inputFields() {
      let userNameMessage = '';
      let passwordMesage = '';
      if((this.state.username.length < 5) && (this.state.username.length > 0)) {
        userNameMessage = 'Username must be greater than 5 characters';
      }
      if((this.state.password.length < 8) && (this.state.password.length > 0)) {
        passwordMesage = 'Password must be at least 8 characters long';
      }

      return(
        <form className='inputField'>
          <p>{userNameMessage}</p>
          <input 
          type='text' 
          placeholder='Username'
          onChange = {this.onUserNameChange}
          />
          <p>{passwordMesage}</p>
          <input 
          type='password' 
          placeholder='Password'
          onChange = {this.onPasswordChange}
          />
        </form>
      );
    }

    getBottom() {
      return(
        <div className='bottom'>
          <button>LOGIN</button>
          <p>SignUp</p>
        </div>
      )
    }

    render() {
      return(
        <div>
          <h1>Navy Notes</h1>
          {this.inputFields()}
          {this.getBottom()}
        </div>
      );
    }
}

  export default Login;
