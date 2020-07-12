import React from 'react';
import './UserPrompt.css'

function InputFields(props) {
    let oldPasswordMessage = '';
    let newPasswordMessage = '';
    if((props.oldPassword.length < 8) && (props.oldPassword.length > 0)) {
        oldPasswordMessage = 'Password must be at least 8 characters long';
    }
    if((props.newPassword.length < 8) && (props.newPassword.length > 0)) {
        newPasswordMessage = 'Password must be at least 8 characters long';
    }

    return(
        <form className='userprompt-inputField'>
            <p>{oldPasswordMessage}</p>
            <input 
            type='password'
            placeholder='Old Password'
            onChange = {props.onOldPasswordChange}
            />
            <p>{newPasswordMessage}</p>
            <input 
            type='password'
            placeholder = 'New Password'
            onChange = {props.onNewPasswordChange}
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

function PasswordChangeView(props) {
    return(
        <div className='userprompt'>
            <h1>Navy Notes</h1>
            <InputFields 
            oldPassword = {props.oldPassword}
            newPassword = {props.newPassword}
            onOldPasswordChange = {props.onOldPasswordChange}
            onNewPasswordChange = {props.onNewPasswordChange}
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

export default PasswordChangeView;