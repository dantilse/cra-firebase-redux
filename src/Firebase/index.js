// TODO: should be able to import and export in a single call,
// or use export { FirebaseContext, Firebase as default }
import FirebaseContext, { withFirebase } from "./context";
import Firebase from "./firebase";

export default Firebase;

export { FirebaseContext, withFirebase };
