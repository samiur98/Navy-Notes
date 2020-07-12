import React from 'react';
import axios from 'axios';
import PasswordChangeView from './PasswordChangeView.js';

class PasswordChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: ''
        }
        this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
        this.onLinkClick = this.onLinkClick.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onOldPasswordChange(event) {
        const newValue = event.target.value;
        this.setState(prevState => {
            return{
                oldPassword: newValue,
                newPassword: prevState.newPassword
            }
        });
    }

    onNewPasswordChange(event) {
        const newValue = event.target.value;
        this.setState(prevState => {
            return{
                oldPassword: prevState.oldPassword,
                newPassword: newValue
            };
        });
    }

    onLinkClick() {
        this.props.history.goBack();
    }

    onButtonClick() {
        console.log('ButtonClick');
    }

    render() {
        return(
            <PasswordChangeView 
            oldPassword = {this.state.oldPassword}
            newPassword = {this.state.newPassword}
            buttonText = 'UPDATE PASSWORD'
            linkText = 'Go Back'
            onOldPasswordChange = {this.onOldPasswordChange}
            onNewPasswordChange = {this.onNewPasswordChange}
            onLinkClick = {this.onLinkClick}
            onButtonClick = {this.onButtonClick}
            />
        );
    }
}

export default PasswordChange;