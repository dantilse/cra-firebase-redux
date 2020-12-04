import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";

const Navigation = () => (
  <nav>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNoAuth />)}
    </AuthUserContext.Consumer>
  </nav>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing auth</Link>
    </li>
    <li>
      <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNoAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing no auth</Link>
    </li>
    <li>
      <Link to={ROUTES.REGISTER}>Register</Link>
    </li>
    <li>
      <Link to={ROUTES.LOGIN}>Login</Link>
    </li>
  </ul>
);

export default Navigation;
