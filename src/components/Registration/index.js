import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const Registration = () => (
  <>
    <h1>Registration page</h1>
    <RegistrationForm />
  </>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class RegistrationFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    event.preventDefault();

    this.props.firebase
      .handleCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ userData: { username, email } });
      })
      .then((authUser) => {
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
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full name"
          />
        </div>
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
          <label htmlFor="passwordOne">Password</label>
          <input
            id="passwordOne"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <label htmlFor="passwordTwo">Confirm password</label>
          <input
            id="passwordTwo"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm password"
          />
        </div>
        <button disabled={isInvalid} type="submit">
          Register
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RegistrationLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
  </p>
);

const RegistrationForm = withRouter(withFirebase(RegistrationFormBase));

export default Registration;

export { RegistrationForm, RegistrationLink };
