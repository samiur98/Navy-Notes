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
            placeholder: 0,
            userID: 14, //this.props.history.location.state.userID,
            userName: 'barney98', //this.props.history.location.state.user_name,
            password: 'jklchu', //this.props.history.location.state.password
            delete: false
        }
        this.onDelete = this.onDelete.bind(this);
    }

    getDeleteStyle() {
        return {
            'backgroundColor': 'navy',
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
        return(
            <div className='top'>
                <h1>{`${this.state.userName}'s Dashboard`}</h1>
                <IconButton style={this.getDeleteStyle()} onClick={this.onDelete}>
                    <DeleteIcon />
                </IconButton>
                <IconButton style={this.getDeleteStyle()}>
                    <AddBoxIcon />
                </IconButton>
                <IconButton style={this.getDeleteStyle()}>
                    <AccountBoxIcon />
                </IconButton>
            </div>
        );
    }
    
    getGrid() {
        return(
            <div className='grid-container'>

            </div>
        );
    }

    render() {
        console.log(this.state.delete);
        return(
            <div>
                {this.getTop()}
                {this.getGrid()}
            </div>
        );
    }
}

export default Dashboard;