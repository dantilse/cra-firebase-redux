import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withAuthorization } from "../Session";

const ContactDetails = (contact) => {
  const {
    cell,
    dob,
    email,
    gender,
    id,
    location,
    login,
    name,
    nat,
    phone,
    picture,
    registered,
  } = contact;

  const { city, postcode, state, street } = location;
  const birthday = new Date(dob.date).toLocaleDateString("en-US");
  console.log(birthday);
  return (
    <div>
      <img src={picture.large} alt={`${name.first} ${name.last}`} />
      <h2>
        {name.first} {name.last}
      </h2>
      <p>{login.username}</p>
      <ul>
        <li>{phone}</li>
        <li>{email}</li>
        <li>
          <address>
            {`${street.number} ${street.name}`}
            <br />
            {`${city} ${state} ${postcode}`}
          </address>
        </li>
        <li>{birthday}</li>
        <li>{dob.age} years old</li>
      </ul>
    </div>
  );
};

const ContactPage = (props) => {
  const match = props.match;
  const { id } = match.params;

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(props.firebase.auth.currentUser.uid, match, id);

  useEffect(() => {
    const onChange = (snapshot) => {
      try {
        const contacts = snapshot.val().contacts;

        contacts.map((contact) =>
          contact.login.uuid === id ? setContact(contact) : null
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // NOTE: changed this since this is already more easily defined in Firebase.js
    // TODO: the old reference still exists
    const userRef = props.firebase.user(props.firebase.auth.currentUser.uid);
    userRef.on("value", onChange);

    return () => {
      userRef.off("value", onChange);
    };
  }, [id, props.firebase]);

  return (
    <div>
      <Link
        to="/dashboard/"
        style={{ display: "inline-block", marginBottom: 30 }}
      >
        &lsaquo;Back to Dashboard
      </Link>
      {loading ? <p>Loading...</p> : <ContactDetails contact={contact} />}
      {/* <pre>
        <code>{JSON.stringify(contact, null, 2)}</code>
      </pre> */}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ContactPage);
