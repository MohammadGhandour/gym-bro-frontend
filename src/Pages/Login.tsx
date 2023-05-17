import axios from "axios";
import { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { UserData } from "../App";
import UserForm from "../Components/UserForm";
import { api } from "../Config/Api";

function Login() {
    const [errorMessage, setErrorMessage] = useState("");

    function login(data: UserData) {
        setErrorMessage("");

        axios.post(`${api}/users/login`, data)
            .then(res => {
                const user = res.data;
                setErrorMessage("");
                localStorage.setItem("userId", JSON.stringify(user.userId));
                localStorage.setItem("token", JSON.stringify(user.token));
                localStorage.setItem("username", JSON.stringify(user.username));
                window.location.reload();
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setErrorMessage(err.response.data.error);
                } else {
                    setErrorMessage("SERVER ERROR. TRY AGAIN LATER !");
                }
            })
    };

    return (
        <Container className="mt-5">
            <Stack direction="vertical" className="text-center">
                <h1 className="text-secondary font-weight-bold">GYM BRO</h1>
                <h3 className="">WELCOME BACK! LET'S GET DOWN TO BUSINESS.</h3>
                <UserForm
                    onSubmit={login}
                    errorMessage={errorMessage}
                    buttonText="Login"
                    formText="Don't have an account ?"
                    goTo="/register"
                    linkText="Register" />
            </Stack>
        </Container>
    )
}

export default Login;
