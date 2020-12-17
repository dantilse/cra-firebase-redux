import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import styles from "./contacts.module.scss";

// Expecting in an UUID that can be used
// to find this Contact in the list of contacts

const Contact = (props) => {
  const { picture, name, email } = props.contact;
  return (
    <figure className={styles.contact}>
      <img className={styles.img} src={picture.medium} alt={name} />
      <figcaption className={styles.details}>
        <h3 className={styles.name}>
          {name.first} {name.last}
        </h3>
        <p className={styles.email}>{email}</p>
      </figcaption>
    </figure>
  );
};

export default withRouter(withFirebase(Contact));
