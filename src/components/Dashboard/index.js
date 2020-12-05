import { useEffect, useState } from "react";
import { AuthUserContext, withAuthorization } from "../Session";

const Dashboard = (props) => {
  const { firebase } = props;
  const { auth, db } = firebase;

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    db.ref(`/users/${auth.currentUser.uid}`).once("value", (snapshot) => {
      console.log(snapshot.val(), "vaule");
      setContacts(snapshot.val().contacts);
    });
  }, [db, auth.currentUser.uid]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>Dashboard: {authUser.email}</h1>
          <p>Welcome</p>
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
