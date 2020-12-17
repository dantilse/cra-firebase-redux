import {} from "module";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "../Session";
import Contact from "../Contact";
import styles from "../Contact/contacts.module.scss";

const Dashboard = (props) => {
  const { auth, db, user } = props.firebase;

  const [contactList, setContactList] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onChange = (snapshot) => {
      try {
        let { contacts, userData = {} } = snapshot.val();
        console.log(snapshot.val().contacts);
        setContactList(contacts);
        setUsername(userData.username);
        setEmail(userData.email);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // NOTE: changed this since this is already more easily defined in Firebase.js
    // TODO: the old reference still exists
    const userRef = user(auth.currentUser.uid);
    userRef.on("value", onChange);

    // Set test data to work with, single contact
    // user(`${auth.currentUser.uid}/contacts`).set({
    //   "664128af-073a-4161-bf2d-3466b8828191": {
    //     dob: {
    //       day: 1,
    //       month: 1,
    //       year: 1980,
    //     },
    //     email: "irma.holland@example.com",
    //     gender: "female",
    //     address: {
    //       city: "Omaha",
    //       country: "United States",
    //       postcode: 13957,
    //       state: "WV",
    //       street: {
    //         name: "1254 N Stelling Rd",
    //         number: "E206",
    //       },
    //     },
    //     name: {
    //       first: "Irma",
    //       last: "Holland",
    //       nickname: "Missy",
    //       maiden: "",
    //     },
    //     notes: {
    //       name: {
    //         value: "",
    //       },
    //       name2: {
    //         value: "",
    //       },
    //     },
    //     phone: "(551)-516-0005",
    //     picture: {
    //       large: "https://randomuser.me/api/portraits/women/69.jpg",
    //       medium: "https://randomuser.me/api/portraits/med/women/69.jpg",
    //       thumbnail: "https://randomuser.me/api/portraits/thumb/women/69.jpg",
    //     },
    //     social: {
    //       facebook: "",
    //       instagram: "",
    //       linkedin: "",
    //       twitter: "",
    //     },
    //     work: {
    //       company: "",
    //       email: "",
    //       phone: "",
    //       title: "",
    //     },
    //   },
    // });

    return () => {
      userRef.off("value", onChange);
    };
  }, [user, auth.currentUser.uid]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>Dashboard</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {contactList ? (
                <div>
                  {Object.keys(contactList).map((key) => {
                    let innerContact = contactList[key];
                    console.log(innerContact);
                    return (
                      <Link to={`/dashboard/${key}`}>
                        <Contact contact={innerContact} />
                      </Link>
                    );
                  })}
                  {/* <pre>
                    <code>{JSON.stringify(contactList, null, 2)}</code>
                  </pre> */}
                </div>
              ) : (
                <p>No contacts to display</p>
              )}
            </>
          )}
          {/* <pre>
            <code>{JSON.stringify(authUser, null, 2)}</code>
          </pre> */}
          {/* <pre>
            <code>{JSON.stringify(contacts[0], null, 2)}</code>
          </pre> */}
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Dashboard);
