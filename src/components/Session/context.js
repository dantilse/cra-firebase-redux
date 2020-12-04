import React from "react";

const AuthUserContext = React.createContext(null);

// export const withFirebase = (Component) => (props) => (
//   <AuthUserContext.Consumer>
//     {(firebase) => <Component {...props} firebase={firebase} />}
//   </AuthUserContext.Consumer>
// );

export default AuthUserContext;
