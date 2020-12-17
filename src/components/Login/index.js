import { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { RegistrationLink } from "../Registration";
import { PasswordResetLink } from "../PasswordReset";
import TextInput from "../TextInput";
import Button from "../Button";

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
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={this.onChange}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={this.onChange}
        />
        <Button disabled={isInvalid} type="submit">
          Login
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default Login;

export { LoginForm };
