import React from 'react';
import Note from './Note.js';
import axios from 'axios';

class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            userID: this.props.location.state.userID
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onLeftButtonClick = this.onLeftButtonClick.bind(this);
        this.onRightButtonClick = this.onRightButtonClick.bind(this);
    }

    onTitleChange(event) {
        const newTitle = event.target.value;
        this.setState(prevState => {
            return {
                title: newTitle,
                text: prevState.text,
                userID: prevState.userID
            };
        });
    }

    onTextChange(event) {
        const newText = event.target.value;
        this.setState(prevState => {
            return {
                title: prevState.title,
                text: newText,
                userID: prevState.userID
            }
        });
    }

    onLeftButtonClick() {
        this.addNotesQuery(this.state.title, this.state.text,
            this.state.userID, this.props.history);
    }

    onRightButtonClick() {
        this.props.history.goBack();
    }

    addNotesQuery(title, text, userID, history) {
        const body = {
            title: title,
            text: text,
            userID: userID
        }
        const successMessage = 'Note Successfully added.'
        const failureMessage = 'Note could not be added at this point, please try again later.'
        // console.log(body);
        axios({
            method: 'post',
            timeout: 5000,
            url: 'http://localhost:5000/notes/addNote',
            data: body
        }).then(res => {
            if (res.status === 201) {
                alert(successMessage);
                history.goBack();
            } else {
                alert(failureMessage);
                history.goBack();
            }
        }).catch(error => {
            console.error(error);
            alert(failureMessage);
            history.goBack();
        });
    }

    render() {
        return(
            <Note 
            title = {this.state.title}
            text = {this.state.text}
            leftButtonText = 'ADD'
            rightButtonText = 'CANCEL'
            onTitleChange = {this.onTitleChange}
            onTextChange = {this.onTextChange}
            onLeftButtonClick = {this.onLeftButtonClick}
            onRightButtonClick = {this.onRightButtonClick}
            />
        );
    }
}

export default NewNote;