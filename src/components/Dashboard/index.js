import { useEffect, useState } from "react";
import { AuthUserContext, withAuthorization } from "../Session";

const Dashboard = (props) => {
  const { auth, db } = props.firebase;

  const [contacts, setContacts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // removing auth.currentUser allows user to see other user's info
    // TODO: fix database rules to make this more secure
    db.ref(`/users/${auth.currentUser.uid}`).once("value", (snapshot) => {
      setContacts(snapshot.val().contacts);
      setUsername(snapshot.val().userData.username);
    });
  }, [db, auth.currentUser.uid]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>Dashboard: {authUser.email}</h1>
          <p>Welcome {username}</p>
          <pre>
            <code>{JSON.stringify(authUser, null, 2)}</code>
          </pre>
          {contacts && contacts.length > 0 ? (
            <p>We have contacts: {contacts.length}</p>
          ) : (
            <p>No contacts to display</p>
          )}
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Dashboard);
