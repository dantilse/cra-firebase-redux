import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Button from "../Button";
import TextInput from "../TextInput";

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
      setFormState({ ...formState, error });
      console.error("submit error", error);
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
      <TextInput
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => onChange(e)}
      />
      <TextInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => onChange(e)}
      />
      <TextInput
        id="passwordOne"
        label="Password"
        type="password"
        value={passwordOne}
        onChange={(e) => onChange(e)}
      />
      <TextInput
        id="passwordTwo"
        label="Confirm Password"
        type="password"
        value={passwordTwo}
        onChange={(e) => onChange(e)}
      />
      <Button disabled={isInvalid} type="submit">
        Register
      </Button>

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
