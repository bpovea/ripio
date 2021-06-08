import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Cookies from 'universal-cookie';

import Dashboard from './components/Dashboard';
import FormSingIn from './components/SingIn';

function App() {
  const cookies = new Cookies();
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <FormSingIn />
        </Route>
        <Route path="/dashboard">
          {
            cookies.get('token') === 'null' ?
              <Redirect to="/login" /> :
              <Dashboard />
          }
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
