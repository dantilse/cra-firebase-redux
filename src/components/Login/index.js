import { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { RegistrationLink } from "../Registration";
import { PasswordResetLink } from "../PasswordReset";

const Login = () => (
  <>
    <h1>Login page</h1>
    <LoginForm />
    <PasswordResetLink />
    <RegistrationLink />
  </>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    event.preventDefault();

    this.props.firebase
      .handleSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === "" || password === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <button disabled={isInvalid} type="submit">
          Login
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default Login;

export { LoginForm };
