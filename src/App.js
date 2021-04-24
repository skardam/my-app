import LoginForm from "./components/loginForm";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
