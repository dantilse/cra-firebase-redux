import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.handleSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
