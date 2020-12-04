import { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

// TODO: email should be invalid if email matches current email address

const PasswordReset = () => (
  <>
    <h1>Password Recovery</h1>
    <PasswordResetForm />
  </>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordResetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    event.preventDefault();

    this.props.firebase
      .handlePasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => this.setState({ error }));
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

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
        <button disabled={isInvalid} type="submit">
          Reset password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordResetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_RESET}>Forgot Password?</Link>
  </p>
);

const PasswordResetForm = withFirebase(PasswordResetFormBase);

export default PasswordReset;

export { PasswordResetForm, PasswordResetLink };
