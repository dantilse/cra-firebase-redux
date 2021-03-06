import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";
import * as ROUTES from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  // TODO: convert classes to functional components with hooks
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;
