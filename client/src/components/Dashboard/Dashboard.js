import React from 'react';
import './Dashboard.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import dummyList from '../dummyList.js';
import axios from 'axios';

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
        console.log('Mounty');
        this.getNotesQuery(this.state.userID, this.props.history);
    }

    getButtonStyle(backgroundColor) {
        return {
            'backgroundColor': backgroundColor,
            'color': 'white',
            'fontSize': 90,
            'borderRadius': 0,
            'border': '1px solid white',
            'position': 'relative',
            'left': 750,
            'top': 0,
            'height': 142,
            'width': '16%',
            'margin': 0
        };
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
            userID: this.state.userID,
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

    getTop() {
        let deleteBackgroundColor = 'navy';
        let userBackgroundColor = 'navy';
        if (this.state.delete) {
            deleteBackgroundColor = 'tomato'
        }
        if (this.state.userInfo) {
            userBackgroundColor = 'lightblue';
        }

        return(
            <div className='dashboard-top'>
                <h1>{`${this.state.userName}'s Dashboard`}</h1>

                <IconButton style={this.getButtonStyle(deleteBackgroundColor)} onClick={this.onDelete}>
                    <DeleteIcon />
                </IconButton>

                <IconButton style={this.getButtonStyle('navy')} onClick={this.onAdd}>
                    <AddBoxIcon />
                </IconButton>

                <IconButton style={this.getButtonStyle(userBackgroundColor)} onClick={this.onUserInfo}>
                    <AccountBoxIcon />
                </IconButton>
            </div>
        );
    }

    getUserOptions() {
        if(!this.state.userInfo) {
            return(
                <div></div>
            );
        }
        return(
            <div className='dashboard-user'>
                <p onClick={this.onPasswordChange}>Change Password</p>
                <p onClick={this.onSignOut}>Sign Out</p>
            </div>
        );
    }

    getNoteComponents() {
        let deleteClass = 'dashboard';
        if (this.state.delete) {
            deleteClass = 'dashboard-delete';
        }
        const noteComponents = this.state.notes.map(note => {
            return (
                <div className={deleteClass} key={note.id} onClick={() => this.onNoteClick(note.id)}>
                    <h2>{note.title}</h2>
                </div>
                
            );
        });
        return noteComponents;
    }

    getGrid() {
        const noteComponents = this.getNoteComponents();
        return(
            <div className='dashboard-grid-container'>
                { noteComponents }
            </div>
        );
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
        let deleteNote = '';
        if (this.state.delete) {
            deleteNote = 'Click on Note to Delete';
        }

        return(
            <div className='dashboard'>
                {this.getTop()}
                {this.getUserOptions()}
                <p>{deleteNote}</p>
                {this.getGrid()}
            </div>
        );
    }
}

export default Dashboard;