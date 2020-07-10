import React from 'react';
import '../styles/Dashboard.css'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import dummyList from '../dummyList.js';
import axios from 'axios';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 14, //this.props.history.location.state.userID,
            userName: 'barney98', //this.props.history.location.state.user_name,
            password: 'jklchu', //this.props.history.location.state.password
            delete: false,
            notes: dummyList
        }
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
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
                delete: !prevState.delete
            };
        });
    }

    onAdd() {
        const data = {
            userID: this.state.userID
        }
        this.props.history.push('/newnote', data);
    }

    getTop() {
        let deleteBackgroundColor = 'navy';
        if (this.state.delete) {
            deleteBackgroundColor = 'tomato'
        }

        return(
            <div className='top'>
                <h1>{`${this.state.userName}'s Dashboard`}</h1>

                <IconButton style={this.getButtonStyle(deleteBackgroundColor)} onClick={this.onDelete}>
                    <DeleteIcon />
                </IconButton>

                <IconButton style={this.getButtonStyle('navy')} onClick={this.onAdd}>
                    <AddBoxIcon />
                </IconButton>

                <IconButton style={this.getButtonStyle('navy')}>
                    <AccountBoxIcon />
                </IconButton>
            </div>
        );
    }
    
    getNoteComponents() {
        let deleteClass = '';
        if (this.state.delete) {
            deleteClass = 'delete';
        }
        const noteComponents = this.state.notes.map(note => {
            return (
                <div className={deleteClass} key={note.id}>
                    <h2>{note.title}</h2>
                </div>
                
            );
        });
        return noteComponents;
    }

    getGrid() {
        const noteComponents = this.getNoteComponents();
        return(
            <div className='grid-container'>
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
                    notes: res.data
                };
            });
        }).catch(error => {
            console.error(error);
            alert(errorMessage);
            history.goBack();
        });
    }

    render() {
        let deleteNote = '';
        if (this.state.delete) {
            deleteNote = 'Click on Note to Delete';
        }

        return(
            <div>
                {this.getTop()}
                <p>{deleteNote}</p>
                {this.getGrid()}
            </div>
        );
    }
}

export default Dashboard;