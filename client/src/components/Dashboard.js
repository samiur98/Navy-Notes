import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: 0,
            userID: this.props.history.location.state.userID,
            userName: this.props.history.location.state.user_name,
            password: this.props.history.location.state.password
        }
        console.log(this.props.history);
    }

    render() {
        return(
            <div>
                <h1>{this.state.userName}</h1>
                <h1>{this.state.userID}</h1>
                <h1>{this.state.password}</h1>
            </div>
        );
    }
}

export default Dashboard;