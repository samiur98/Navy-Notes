import React from 'react';
import './UserPrompt.css';

function InputFields(props) {
    let userNameMessage = '';
    let passwordMesage = '';
    if((props.username.length < 5) && (props.username.length > 0)) {
      userNameMessage = 'Username must be greater than 5 characters';
    }
    if((props.password.length < 8) && (props.password.length > 0)) {
      passwordMesage = 'Password must be at least 8 characters long';
    }

    return(
      <form className='userprompt-inputField'>
        <p>{userNameMessage}</p>
        <input 
        type='text' 
        placeholder='Username'
        onChange = {props.onUserNameChange}
        />
        <p>{passwordMesage}</p>
        <input 
        type='password' 
        placeholder='Password'
        onChange = {props.onPasswordChange}
        />
      </form>
    );
  }

function Bottom(props) {
    return(
      <div className='userprompt-bottom'>
        <button onClick={props.onButtonClick}>{props.buttonText}</button>
        <p onClick={props.onLinkClick}>{props.linkText}</p>
      </div>
    );
  }

function UserPrompt(props) {
    return (
        <div className='userprompt'>
          <h1>Navy Notes</h1>
          <InputFields 
          username = {props.username}
          password = {props.password}
          onUserNameChange = {props.onUserNameChange}
          onPasswordChange = {props.onPasswordChange}
          />
          <Bottom 
          buttonText = {props.buttonText}
          linkText = {props.linkText}
          onLinkClick = {props.onLinkClick}
          onButtonClick = {props.onButtonClick}
          />
        </div>
    );
}

export default UserPrompt;