import { useEffect, useState } from "react";
import { AuthUserContext, withAuthorization } from "../Session";

const Dashboard = (props) => {
  const { auth, db } = props.firebase;

  const [contacts, setContacts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onChange = (snapshot) => {
      try {
        let { contacts = [], userData = {} } = snapshot.val();
        setContacts(contacts);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.error(error);
      }
    };

    // removing auth.currentUser allows user to see other user's info
    // TODO: fix database rules to make this more secure
    const userRef = db.ref(`/users/${auth.currentUser.uid}`);
    userRef.on("value", onChange);

    return () => {
      userRef.off("value", onChange);
    };
  }, [db, auth.currentUser.uid]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>Dashboard: {email}</h1>
          <p>Welcome {username}</p>
          <pre>
            <code>{JSON.stringify(authUser, null, 2)}</code>
          </pre>
          {contacts && contacts.length > 0 ? (
            <p>We have contacts: {contacts.length}</p>
          ) : (
            <p>No contacts to display</p>
          )}
          <pre>
            <code>{JSON.stringify(contacts, null, 2)}</code>
          </pre>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Dashboard);
