import { useEffect, useState } from "react";
import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordResetForm } from "../PasswordReset";
import PasswordUpdateForm from "../PasswordUpdate";

const Account = (props) => {
  const { auth, user } = props.firebase;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onValueChange = (snapshot) => {
      try {
        let { userData = {} } = snapshot.val();
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.error(error);
      }
    };

    // removing auth.currentUser allows user to see other user's info
    // TODO: fix database rules to make this more secure
    const userRef = user(auth.currentUser.uid);

    userRef.on("value", onValueChange);

    return () => userRef.off("value", onValueChange);
  }, [user, auth.currentUser.uid]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>Hello, {username}</h1>
          <p>{email}</p>
          <hr />
          <PasswordResetForm />
          <PasswordUpdateForm />
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
