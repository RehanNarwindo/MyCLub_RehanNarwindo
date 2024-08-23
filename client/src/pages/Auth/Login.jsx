import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button";
import Swal from "sweetalert2";
import MyClubAPI from "../../services/MyClubAPI";
import { Col, Container, Row } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../feature/authSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const { loading, login, error } = useSelector((state) => state.auth);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleError = () => {
        console.error("Login failed");
    };
    const handleSuccess = async (response) => {
        const token = response.credential;

        try {
            const res = await axios.post("http://yourUrl/loginbygoogle", {
                token,
            });
            console.log("User data:", res.data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            const { data } = await MyClubAPI({
                url: `/loginbygoogle`,
                method: "POST",
                data: {
                    googleToken: response.credential,
                },
            });
            localStorage.setItem("token", data.access_token);
            navigation("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                timer: 5000,
            });
        }
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "your google client id",
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
            theme: "outline",
            size: "large",
        });
        google.accounts.id.prompt();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(
            postLogin({
                email,
                password,
            })
        )
            .then((res) => {
                Swal.fire(`WELCOME`);
                navigation("/");
            })
            .catch((error) => {
                if (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Invalid Email or Password!",
                        timer: 5000,
                    });
                }
            });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <div className="card p-4">
                        <h3 className="text-center mb-4">Login</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    id="email"
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                />
                            </Form.Group>

                            <div className="d-grid gap-2 mb-3">
                                <ButtonComponent
                                    buttonType="LOGIN"
                                    buttonVariant="primary"
                                    type="submit"
                                    size="sm"
                                />
                            </div>
                            <div id="buttonDiv"></div>

                            <div className="text-center">
                                <Link to="/register">Buat Akun</Link>
                            </div>
                            <div className="text-center">
                                <Link to="/">Guest</Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
