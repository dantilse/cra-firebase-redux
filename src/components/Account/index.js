import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordResetForm } from "../PasswordReset";
import PasswordUpdateForm from "../PasswordUpdate";

const Account = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <>
        <h1>Account: {authUser.email}</h1>
        <PasswordResetForm />
        <PasswordUpdateForm />
      </>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
