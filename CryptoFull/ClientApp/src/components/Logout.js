import { Redirect } from "react-router";

const Logout = ({ setUser, setLoggedIn }) => {
    setUser({ id: "1" });
  setLoggedIn(false);
  return <Redirect to="/" />;
};

export default Logout;
