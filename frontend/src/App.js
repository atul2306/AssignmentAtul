import Signup from './components/Authentication/Signup';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Signin from './components/Authentication/Signin';
import DashBoard from './components/Blog/DashBoard';
import { useEffect } from 'react';
import AddBlog from './components/Blog/AddBlog';

function App() {
  const token = localStorage.getItem('token');

  useEffect(() => {
  }, [token]);

  return (
    <Router>
      <Switch>
        {token ? (
          <>
          <Route exact path="/blog/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/blog/addBlog">
            <AddBlog/>
          </Route>
          <Redirect to="/blog/dashboard" />
          </>
        ) : (
          <>
            <Route exact path="/auth/signup">
              <Signup />
            </Route>
            <Route exact path="/auth/signin">
              <Signin />
            </Route>
            <Redirect to="/auth/signin" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
