import axios from "axios";
import { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import UserForm from "../Components/UserForm";
import { api } from "../Config/Api";

function Register() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function register(data: UserData) {
        setErrorMessage("");

        axios.post(`${api}/users/signup`, data)
            .then((user) => {
                setErrorMessage('');
                localStorage.setItem('userId', JSON.stringify(user.data.userId));
                localStorage.setItem('token', JSON.stringify(user.data.token));
                localStorage.setItem("username", JSON.stringify(user.data.username));
                navigate('/');
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
                <h3 className="">IT'S ALL ABOUT WHAT YOU CAN ACHIEVE.</h3>
                <UserForm
                    onSubmit={register}
                    errorMessage={errorMessage}
                    buttonText="Register"
                    formText="Already have an account ?"
                    goTo="/"
                    linkText="Login" />
            </Stack>
        </Container>
    )
}

export default Register;
