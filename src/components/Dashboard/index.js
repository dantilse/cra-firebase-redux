import { Component } from "react";
import { withAuthorization } from "../Session";

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <div>
          <strong>id:</strong> {user.uid}
        </div>
        <div>
          <strong>email:</strong> {user.email}
        </div>
        <div>
          <strong>username:</strong> {user.username}
        </div>
      </li>
    ))}
  </ul>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <>
        <h1>Dashboard</h1>
        {loading && <div>Loading...</div>}
        <UserList users={users} />
      </>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Dashboard);
