import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Account from "../Account";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Registration from "../Registration";
import LandingPage from "../LandingPage";
import PasswordReset from "../PasswordReset";
import Navigation from "../Navigation";
import { withAuthentication } from "../Session";
import * as ROUTES from "../../constants/routes";

// TODO: import/export all pages/components for simplicity?
// ie. import { Navigation, Header, Footer } from './components/(index);
// Also, divide pages and components: pages may use common components
// - but need to be set up for routes specifically

const App = () => (
  <div className="app">
    <Router>
      <header className="app-header">
        <div className="container">
          <Navigation />
        </div>
      </header>
      <div className="app-body">
        <div className="container">
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.REGISTER} component={Registration} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route exact path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
        </div>
      </div>
    </Router>
    <div className="app-footer">
      <div className="container">
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create React App Docs
        </a>
      </div>
    </div>
  </div>
);

export default withAuthentication(App);
