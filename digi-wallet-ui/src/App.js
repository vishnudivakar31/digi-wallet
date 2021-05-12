import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './containers/Home'
import SignUp from './containers/SignUp'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
