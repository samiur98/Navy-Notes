import React from 'react';
import './Dashboard.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

function getButtonStyle(backgroundColor) {
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

function Top(props) {
    let deleteBackgroundColor = 'navy';
    let userBackgroundColor = 'navy';
    if (props.delete) {
        deleteBackgroundColor = 'tomato'
    }
    if (props.userInfo) {
        userBackgroundColor = 'lightblue';
    }

    return(
        <div className='dashboard-top'>
            <h1>{`${props.userName}'s Dashboard`}</h1>

            <IconButton style={getButtonStyle(deleteBackgroundColor)} onClick={props.onDelete}>
                <DeleteIcon />
            </IconButton>

            <IconButton style={getButtonStyle('navy')} onClick={props.onAdd}>
                <AddBoxIcon />
            </IconButton>

            <IconButton style={getButtonStyle(userBackgroundColor)} onClick={props.onUserInfo}>
                <AccountBoxIcon />
            </IconButton>
        </div>
    );
}

function UserOptions(props) {
    if(!props.userInfo) {
        return(
            <div></div>
        );
    }
    return(
        <div className='dashboard-user'>
            <p onClick={props.onPasswordChange}>Change Password</p>
            <p onClick={props.onSignOut}>Sign Out</p>
        </div>
    );
}

function Grid(props) {
    let deleteClass = 'dashboard';
    if (props.delete) {
        deleteClass = 'dashboard-delete';
    }

    const noteComponents = props.notes.map(note => {
        return (
            <div className={deleteClass} key={note.id} onClick={() => props.onNoteClick(note.id)}>
                <h2>{note.title}</h2>
            </div>
            
        );
    });

    return(
        <div className='dashboard-grid-container'>
            { noteComponents }
        </div>
    );
}

function DashBoardView(props) {
    let deleteNote = '';
        if (props.delete) {
            deleteNote = 'Click on Note to Delete';
        }
    
    return(
        <div className='dashboard'>
            <Top 
            delete={props.delete}
            userInfo={props.userInfo}
            userName={props.userName}
            onDelete={props.onDelete}
            onAdd={props.onAdd}
            onUserInfo={props.onUserInfo}
            />
            <UserOptions
            userInfo={props.userInfo}
            onPasswordChange={props.onPasswordChange}
            onSignOut={props.onSignOut}
            />
            <p>{deleteNote}</p>
            <Grid 
            delete={props.delete}
            notes={props.notes}
            onNoteClick={props.onNoteClick}
            />
        </div>
    );
}

export default DashBoardView;
