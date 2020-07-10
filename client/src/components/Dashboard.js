import React from 'react';
import '../styles/Dashboard.css'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 14, //this.props.history.location.state.userID,
            userName: 'barney98', //this.props.history.location.state.user_name,
            password: 'jklchu', //this.props.history.location.state.password
            delete: false,
            notes: [
                {
                    id: 3,
                    title: 'cat'
                },
                {
                    id: 7,
                    title: 'dog'
                },
                {
                    id: 9,
                    title: 'parrot'
                },
                {
                    id: 19,
                    title: 'rabbit'
                },
                {
                    id: 23,
                    title: 'hamster'
                },
                {
                    id: 24,
                    title: 'cow'
                },
                {
                    id: 25,
                    title: 'tiger'
                },
                {
                    id: 27,
                    title: 'lion'
                },
                {
                    id: 30,
                    title: 'wolf'
                }
            ]
        }
        this.onDelete = this.onDelete.bind(this);
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

                <IconButton style={this.getButtonStyle('navy')}>
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
                <div className={deleteClass}>
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