import React from 'react';
import axios from 'axios';
import DashBoardView from './DashBoardView.js';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.history.location.state.userID,
            userName: this.props.history.location.state.user_name,
            password: this.props.history.location.state.password,
            delete: false,
            userInfo: false,
            notes: []
        }
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onUserInfo = this.onUserInfo.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNoteClick = this.onNoteClick.bind(this);
    }

    componentDidMount() {
        this.getNotesQuery(this.state.userID, this.props.history);
    }

    onDelete() {
        this.setState(prevState => {
            return {
                userID: prevState.userID,
                userName: prevState.userName,
                password: prevState.password,
                delete: !prevState.delete,
                userInfo: prevState.userInfo,
                notes: prevState.notes
            };
        });
    }

    onAdd() {
        const data = {
            userID: this.state.userID
        };
        this.props.history.push('/newnote', data);
    }

    onUserInfo() {
        this.setState(prevState => {
            return{
                userID: prevState.userID,
                userName: prevState.userName,
                password: prevState.password,
                delete: prevState.delete,
                userInfo: !prevState.userInfo,
                notes: prevState.notes
            };
        });
    }

    onSignOut() {
        this.props.history.goBack();
    }

    onPasswordChange() {
        const data = {
            userName: this.state.userName
        };
        this.props.history.push('/passwordchange', data);
    }

    onNoteClick(noteID) {
        const data = {
            noteID: noteID
        };
        if(this.state.delete) {
            this.deleteNoteQuery(noteID);
        } else {
            this.props.history.push('/existingnote', data);
        }
    }

    getNotesQuery(userID, history) {
        const errorMessage = 'Data could not be recieved at this time, please try again later.'
        axios({
            method: 'get',
            timeout: 5000,
            url: `http://localhost:5000/notes/getNotes/${userID}`,
        }).then(res => {
            this.setState(prevState => {
                return {
                    userID: prevState.userID, 
                    userName: prevState.userName, 
                    password: prevState.password,
                    delete: prevState.delete,
                    userInfo: prevState.userInfo,
                    notes: res.data
                };
            });
        }).catch(error => {
            console.error(error);
            alert(errorMessage);
            history.goBack();
        });
    }

    deleteNoteQuery(noteID) {
        const errorMessage = 'Note could not be deleted at this time, please try again later.';
        axios({
           method: 'delete',
           timeout: 5000,
           url: `http://localhost:5000/notes/deleteNote/${noteID}` 
        }).then(res => {
            if(res.status === 200) {
                this.updateDeletedNotes(noteID);
            } else {
                alert(errorMessage);
            }
        }).catch(error => {
            console.error(error);
            alert(errorMessage);
        });
    }

    updateDeletedNotes(noteID) {
        const newNotes = [];
        this.state.notes.forEach(note => {
            if(note.id !== noteID) {
                newNotes.push(note);
            }
        })
        this.setState(prevState => {
            return {
                userID: prevState.userID,
                userName: prevState.userName,
                password: prevState.password,
                delete: prevState.delete,
                userInfo: prevState.userInfo,
                notes: newNotes
            };
        });
    }

    render() {
        return(
            <div>
                <DashBoardView 
                delete={this.state.delete}
                userInfo={this.state.userInfo}
                userName={this.state.userName}
                notes={this.state.notes}
                onAdd={this.onAdd}
                onUserInfo={this.onUserInfo}
                onDelete={this.onDelete}
                onNoteClick={this.onNoteClick}
                onPasswordChange={this.onPasswordChange}
                onSignOut={this.onSignOut}
                />
            </div>
        );
    }
}

export default Dashboard;