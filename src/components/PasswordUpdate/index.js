import { Component } from "react";
import { withFirebase } from "../Firebase";
import TextInput from "../TextInput";
import Button from "../Button";

// TODO: email should be invalid if email matches current email address

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    event.preventDefault();

    this.props.firebase
      .handlePasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => this.setState({ error }));
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <TextInput
          id="passwordOne"
          label="New Password"
          type="password"
          value={passwordOne}
          onChange={this.onChange}
        />
        <TextInput
          id="passwordTwo"
          label="Confirm Password"
          type="password"
          value={passwordTwo}
          onChange={this.onChange}
        />
        <Button type="submit" disabled={isInvalid}>
          Reset Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordUpdateForm);
