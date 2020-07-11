import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js'
import Dashboard from './components/Dashboard.js';
import NewNote from './components/NewNote.js';
import ExistingNote from './components/ExistingNote.js';
import Note from './components/Note.js'
// import NewNote from './components/NewNote.js'
// import Te from './components/Te.js'

class App extends React.Component {

  render() {
    return(
      <div>
        <Switch>
          <Route component = {Dashboard} exact path = '/'/>
          <Route component = {SignUp} exact path = '/signup'/>
          <Route component = {Dashboard} exact path = '/dashboard' />
          <Route component = {NewNote} exact path = '/newnote' />
          <Route component = {ExistingNote} exact path = '/existingnote'/>
        </Switch>
      </div>
    );
  }
}

export default App;
