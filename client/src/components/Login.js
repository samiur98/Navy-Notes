import React from 'react';
import '../styles/Login.css';

class Login extends React.Component {
    
    inputFields() {
      return(
        <form className='inputField'>
          <input type='text' placeholder='Username'/>
          <input type='text' placeholder='Password'/>
        </form>
      );
    }

    getButton() {
      return(
        <div style={{textAlign: 'center'}}>
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
          {this.getButton()}
          
        </div>
      );
    }
}

  export default Login;
