import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Image,
} from "react-bootstrap";
import MyClubAPI from "../services/MyClubAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MyDreamClubForm() {
  const [show, setShow] = useState(false);
  const [dataImg, setDataImg] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [teamData, setTeamData] = useState({
    name: "",
    logo: "",
    stadium: "",
  });
  const navigate = useNavigate();
  const onChangeImg = (event) => {
    setDataImg(event.target.value);
  };
  const handleChange = (el) => {
    const { name, value } = el.target;
    setTeamData({ ...teamData, [name]: value });
  };

  const generateImg = async () => {
    try {
      const respons = await MyClubAPI({
        url: "/myDreamClub/generateLogo",
        method: "POST",
        data: {
          prompt: dataImg,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeamData({ ...teamData, logo: respons.data.imageUrl });
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        timer: 5000,
      });
    }
  };

  const handleSubmit = async (el) => {
    el.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await MyClubAPI({
        url: "/myDreamClub",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: teamData,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Club successfully created",
      });
      navigate("/home/mydreamclub");
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create club",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Header as="h4">Create Your Team</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="teamName">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter team name"
                      name="name"
                      value={teamData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="teamLogo" className="mt-3">
                    <Form.Label>Team Logo URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter logo URL"
                      name="logo"
                      value={teamData.logo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {teamData.logo ? (
                    <Image
                      className="my-2"
                      style={{ width: "300px" }}
                      src={teamData.logo}
                    ></Image>
                  ) : null}

                  <Form.Group>
                    <Button
                      className="btn btn-warning mt-2"
                      onClick={handleShow}
                    >
                      GENERATE LOGO
                    </Button>
                  </Form.Group>

                  <Form.Group controlId="teamStadium" className="mt-3">
                    <Form.Label>Team Stadium</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter stadium name"
                      name="stadium"
                      value={teamData.stadium}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-4">
                    Create Team
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>input logo</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => onChangeImg(event)}
                placeholder="input here"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={generateImg}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyDreamClubForm;
