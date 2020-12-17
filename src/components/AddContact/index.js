import { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";

const AddContact = () => {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    nickname: "",
    // maidenName: "",
    // dobDay: "",
    // dobMonth: "",
    // dobYear: "",
    email: "",
    // gender: "",
    // addressCity: "",
    // addressCountry: "",
    // addressPostcode: "",
    // addressState: "",
    // addressStreetName: "",
    // addressStreetNumber: "",
    phone: "",
    // picture: "",
    // facebook: "",
    // instagram: "",
    // linkedin: "",
    // twitter: "",
    // workCompany: "",
    // workEmail: "",
    // workPhone: "",
    // workTitle: "",
    error: null,
  };
  const [formState, setFormState] = useState(INITIAL_STATE);
  // const { username, email, passwordOne, passwordTwo, error } = formState;

  async function onSubmit(event) {
    event.preventDefault();
    try {
      // const { user } = await firebase.handleCreateUserWithEmailAndPassword(
      //   email,
      //   passwordOne
      // );
      // user.updateProfile({ displayName: username });
      // firebase.user(firebase.auth.currentUser.uid).set({
      //   userData: { username, email },
      // });

      setFormState(INITIAL_STATE);
      // history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setFormState({ ...formState, error });
      console.error("submit error", error);
    }
  }

  function onChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  // const isInvalid =
  //   passwordOne !== passwordTwo ||
  //   passwordOne === "" ||
  //   email === "" ||
  //   username === "";

  return (
    <div>
      <h1>Add Contact</h1>
      <ul>
        <li>name (first, last, nickname, maiden)</li>
        <li>email address</li>
        <li>phone number</li>
        <li>picture</li>
        <li>Birthday (day, month, year)</li>
        <li>gender</li>
        <li>address (country, street, city, state, zip)</li>
        <li>social (facebook, instagram, linkedin, twitter)</li>
        <li>work (company, email, phone, title)</li>
      </ul>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextInput
          id="firstName"
          label="First Name"
          type="text"
          value={formState.firstName}
          onChange={(e) => onChange(e)}
        />
        <TextInput
          id="lastName"
          label="Last Name"
          type="text"
          value={formState.lastName}
          onChange={(e) => onChange(e)}
        />
        <TextInput
          id="nickname"
          label="Nickname"
          type="text"
          value={formState.nickname}
          onChange={(e) => onChange(e)}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={formState.email}
          onChange={(e) => onChange(e)}
        />
        <TextInput
          id="phone"
          label="Phone Number"
          type="text"
          value={formState.phone}
          onChange={(e) => onChange(e)}
        />
        <Button type="submit">Add Contact</Button>
      </form>
    </div>
  );
};

export default AddContact;
