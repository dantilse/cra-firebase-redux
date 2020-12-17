import { NavLink } from "react-router-dom";
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

const MenuLink = ({ to, children }) => (
  <NavLink exact to={to} activeStyle={{ textDecoration: "underline" }}>
    {children}
  </NavLink>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <MenuLink to={ROUTES.LANDING}>Landing auth</MenuLink>
    </li>
    <li>
      <MenuLink to={ROUTES.DASHBOARD}>Dashboard</MenuLink>
    </li>
    <li>
      <MenuLink to={ROUTES.ACCOUNT}>Account</MenuLink>
    </li>
    <li>
      <MenuLink to={ROUTES.ADMIN}>Admin</MenuLink>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNoAuth = () => (
  <ul>
    <li>
      <MenuLink to={ROUTES.LANDING}>Landing no auth</MenuLink>
    </li>
    <li>
      <MenuLink to={ROUTES.REGISTER}>Register</MenuLink>
    </li>
    <li>
      <MenuLink to={ROUTES.LOGIN}>Login</MenuLink>
    </li>
  </ul>
);

export default Navigation;
