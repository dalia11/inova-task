
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login.js';
import Feed from './pages/Feed.js';


const App = () => {
  const [path, setpath] = useState('');
  useEffect(() => {
    let data = localStorage.getItem('token');
    if (data) {
      setpath('/feed')
    } else {
      setpath('/login')
    }
  }, []);
  return (


    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={path} />
        </Route>

        <Route path="/login" render={props =>
            <Login {...props} />
        } />

        <Route path="/feed" render={props =>
          <Feed {...props} />
        } />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
