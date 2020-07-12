import React from 'react';
import axios from 'axios';
import PasswordChangeView from './PasswordChangeView.js';

class PasswordChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.location.state.userName,
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
        if ((this.state.oldPassword.length < 8) || (this.state.newPassword.length < 8)) {
            return;
        }
        this.passwordChangeQuery(this.state.userName, 
            this.state.oldPassword, this.state.newPassword, this.props.history);
    }

    passwordChangeQuery(userName, oldPassword, newPassword, history) {
        axios({
            method: 'post',
            timeout: 5000,
            url: '/users/getUser',
            data: {
                userName: userName,
                password: oldPassword
            }
        }).then(res => {
            if(res.status === 204) {
                alert('Username and/or password is incorrect.');
            } else {
                this.updateQuery(userName, newPassword, history);
            }
        }).catch(error => {
            console.error(error);
            if (error.response.status === 403) {
                alert('Username and/or password is incorrect.');
            } else {
                alert('Cannot change password at this time, please try again later.');
                history.goBack();
            }
        });
    }

    updateQuery(userName, password, history) {
        axios({
            method: 'post',
            timeout: 5000,
            url: '/users/updateUser',
            data: {
                userName: userName,
                password: password
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Password successfully updated!');
            } else {
                alert('Password could not be upated, please try again later');
            }
            history.goBack();
        }).catch(error => {
            console.error(error);
            alert('Password could not be upated, please try again later');
            history.goBack();
        });
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