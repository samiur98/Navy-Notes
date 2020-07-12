import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/UserPrompt/Login.js';
import SignUp from './components/UserPrompt/SignUp.js'
import Dashboard from './components/Dashboard/Dashboard.js';
import NewNote from './components/Note/NewNote.js';
import ExistingNote from './components/Note/ExistingNote.js';
import PasswordChange from './components/UserPrompt/PasswordChange.js'
// import NewNote from './components/NewNote.js'
// import Te from './components/Te.js'

class App extends React.Component {

  render() {
    return(
      <div>
        <Switch>
          <Route component = {Login} exact path = '/'/>
          <Route component = {SignUp} exact path = '/signup'/>
          <Route component = {Dashboard} exact path = '/dashboard' />
          <Route component = {NewNote} exact path = '/newnote' />
          <Route component = {ExistingNote} exact path = '/existingnote'/>
          <Route component = {PasswordChange} exact path = '/passwordchange' />
        </Switch>
      </div>
    );
  }
}

export default App;
