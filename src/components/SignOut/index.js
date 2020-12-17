import { withFirebase } from "../Firebase";
import Button from "../Button";

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.handleSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
