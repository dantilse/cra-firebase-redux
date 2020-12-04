import { Component } from "react";
import { withAuthorization } from "../Session";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    // .on() isn't necessary here, this info should only change from an edit page
    // so the user would need to submit new data and navigate to this page
    // TODO: convert this to a .once() call?
    this.props.firebase.users().on("value", (snapshot) => {
      const userObject = snapshot.val()[
        // TODO: probably not best or most secure way to get this data,
        // Trying to get a single user's data from a 'users' list
        this.props.firebase.auth.currentUser.uid
      ];

      this.setState({
        user: userObject,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { user, loading } = this.state;
    const { email, username } = user;

    return (
      <>
        <h1>Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <p>
            Welcome {username}: {email}
          </p>
        )}
      </>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Dashboard);
