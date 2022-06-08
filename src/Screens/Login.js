import React, { useState } from "react";
import database from '../json/users.json';
import { ciphertext } from '../Components/Crypto'
import { useNavigate } from "react-router-dom";
console.log(ciphertext({ id: 1 }), "ciphertext")
function Login() {
    const navigation = useNavigate()
    const [errorMessages, setErrorMessages] = useState({});
    const [state, setState] = useState({ uname: '', pass: '' });

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var { uname, pass } = state;
        console.log(database, "database")
        const userData = database.users.find((user) => user.email === uname);
        if (userData) {
            if (userData.password !== pass) {
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                var info = ciphertext({ uname: uname, pass: pass, user_id: userData.user_id })
                localStorage.setItem("info", info)
                navigation("/")
            }
        } else {
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    const handleChnage = (e) => {
        const { name, value } = e.target
        setState((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="text" name="uname" required value={state.uname} onChange={(e) => handleChnage(e)} />
                            {renderErrorMessage("uname")}
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="pass" required value={state.pass} onChange={(e) => handleChnage(e)} />
                            {renderErrorMessage("pass")}
                        </div>
                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

