import React from 'react';
import Note from './Note.js';

class NewNote extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            text: '',
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
                text: prevState.text
            };
        });
    }

    onTextChange(event) {
        const newText = event.target.value;
        this.setState(prevState => {
            return {
                title: prevState.title,
                text: newText
            }
        });
    }

    onLeftButtonClick() {
        console.log(this.state.title);
    }

    onRightButtonClick() {
        console.log(this.state.text);
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