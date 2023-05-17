
import { Navbar, Container, Nav, Stack, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.webp";

function Navigation() {

    const navigate = useNavigate();

    const username: string = localStorage.getItem("username") || "";

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem('userId');
        navigate('/');
        window.location.reload();
    }

    return (
        <Navbar className="px-2 border-bottom mb-2">
            <Stack direction="horizontal" className="flex justify-content-between w-100">
                <Col>
                    <Nav className="me-auto">
                        <Link to="/">
                            <img src={logo} alt="gym-bro-logo" width={45} />
                        </Link>
                        <Link to="/create"
                            className="text-decoration-none text-dark d-flex align-items-center justify-content-center ms-3 fs-1rem">Create</Link>
                    </Nav>
                </Col>
                <Col className="d-flex align-items-center justify-content-end gap-2">
                    <h4 className="mb-0 text-secondary fw-500 fs-1rem" style={{ width: "max-content" }}>
                        {JSON.parse(username).split(" ")[0]}
                    </h4>
                    <i className="fa-solid fa-arrow-right-from-bracket text-secondary"
                        role="button"
                        style={{ rotate: "0.5turn" }}
                        onClick={logout}>
                    </i>
                </Col>
            </Stack>
        </Navbar>
    )
}

export default Navigation;
