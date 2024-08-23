import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonComponent from "../../components/Button";
import MyClubAPI from "../../services/MyClubAPI";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "username tidak boleh kosong!",
      });
    } else if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "email tidak boleh kosong!",
      });
    } else if (!password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password tidak boleh kosong!",
      });
    }

    try {
      const response = await MyClubAPI({
        url: `/register`,
        method: "POST",
        data: {
          username: username,
          email: email,
          password: password,
        },
      });

      let data = response.data;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="card p-4">
            <h3 className="text-center mb-4">BUAT AKUN</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleUsername}
                  value={username}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleEmail}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handlePassword}
                  value={password}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <ButtonComponent
                  buttonType="Register"
                  buttonVariant="primary"
                  type="submit"
                  size="sm"
                />
              </div>
            </Form>
            <div className="mt-3">
              <Link to="/login">Sudah ada akun</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
