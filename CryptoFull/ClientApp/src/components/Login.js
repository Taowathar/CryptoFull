import { useState } from "react";
import { Redirect } from "react-router";
import { useAlert } from "react-alert";
import axios from "axios";

const Login = ({ setUser, setLoggedIn, loggedIn }) => {
    const [userData, setuserData] = useState({
        Email: "",
        Password: ""
    });
    const alert = useAlert();
    const login = (e) => {
        e.preventDefault();
        axios.post("/api/user/login", userData).then(Response => {
            if (Response.data.email === "wrong") {
                alert.show("Invalid Email");
                return;
            }
            if (Response.data === "") {
                alert.show("Invalid Password");
                return;
            }
            else {
                setUser(Response.data);
                setLoggedIn(true);
                return;
            }
        });
    };

    const onChange = (e) => {
        e.persist();
        setuserData({ ...userData, [e.target.name]: e.target.value });
    };

    if (loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="register-container">
            <h1>Welcome Back!</h1>
            <form className="register-form" onSubmit={login}>
                <div className="register-email-block">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="Email"
                        onChange={onChange}
                        value={userData.Email}
                        placeholder="Email"
                    />
                </div>
                <div className="register-password-block">
                    <label>Password:</label>
                    <input
                        type="Password"
                        name="Password"
                        onChange={onChange}
                        value={userData.Password}
                        placeholder="Password"
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
