import React from 'react';
import Note from './Note.js';
import axios from 'axios';

class ExistingNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            noteID : this.props.location.state.noteID
        }
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onLeftButtonClick = this.onLeftButtonClick.bind(this);
        this.onRightButtonClick = this.onRightButtonClick.bind(this);
    }

    componentDidMount() {
        this.getNoteQuery(this.state.noteID, this.props.history);
    }

    onTitleChange(event) {
        const newTitle = event.target.value;
        this.setState(prevState => {
            return{
                title: newTitle,
                text: prevState.text,
                noteID: prevState.noteID 
            };
        });
    }

    onTextChange(event) {
        const newText = event.target.value;
        this.setState(prevState => {
            return {
                title: prevState.title,
                text: newText,
                noteID: prevState.noteID
            }
        })
    }

    onLeftButtonClick() {
        this.updateNoteQuery(this.state.noteID, this.props.history);
    }

    onRightButtonClick() {
        this.props.history.goBack();
    }

    getNoteQuery(noteID, history) {
        const errorMessage = 'Cannot retrieve information at this time, please try again later.';
        axios({
            method: 'get',
            timeout: 5000,
            url: `/notes/getNote/${noteID}`
        }).then(res => {
            this.setState(prevState => {
                return{
                    title: res.data.title,
                    text: res.data.text,
                    noteID: prevState.noteID
                }
            });
        }).catch(error => {
            console.error(error);
            alert(errorMessage);
            history.goBack();
        });
    }

    updateNoteQuery(noteID, history) {
        const successMessage = 'Note successfully updated!'
        const errorMessage = 'Cannot update note at this time, please try again later';
        const body = {
            noteID: this.state.noteID,
            title: this.state.title,
            text: this.state.text
        }
        axios({
            method: 'post',
            timeout: 5000,
            url: '/notes/updateNote',
            data: body
        }).then(res => {
            if(res.status === 200) {
                alert(successMessage);
                history.goBack();
            } else {
                alert(errorMessage);
                history.goBack();
            }
        }).catch(error => {
            console.error(error);
            alert(errorMessage);
            history.goBack();
        });
    }
    
    render() {
        return(
            <Note 
            title = {this.state.title}
            text = {this.state.text}
            leftButtonText = 'UPDATE'
            rightButtonText = 'CANCEL'
            onTitleChange = {this.onTitleChange}
            onTextChange = {this.onTextChange}
            onLeftButtonClick = {this.onLeftButtonClick}
            onRightButtonClick = {this.onRightButtonClick}
            />
        );
    }
}

export default ExistingNote;