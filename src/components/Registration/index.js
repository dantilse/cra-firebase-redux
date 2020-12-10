import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const Registration = () => (
  <>
    <h1>Registration page</h1>
    <RegistrationForm />
  </>
);

const RegistrationFormBase = ({ firebase, history }) => {
  const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null,
  };
  const [formState, setFormState] = useState(INITIAL_STATE);
  const { username, email, passwordOne, passwordTwo, error } = formState;

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const { user } = await firebase.handleCreateUserWithEmailAndPassword(
        email,
        passwordOne
      );
      user.updateProfile({ displayName: username });
      firebase.user(firebase.auth.currentUser.uid).set({
        userData: { username, email },
      });

      setFormState(INITIAL_STATE);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  }

  function onChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
};

const RegistrationLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
  </p>
);

const RegistrationForm = withRouter(withFirebase(RegistrationFormBase));

export default Registration;

export { RegistrationForm, RegistrationLink };
