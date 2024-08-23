import { useState, useEffect } from "react";
import MyClubAPI from "../services/MyClubAPI";
import { Col, Container, Row, Card, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDreamClub } from "../feature/myDreamClubSlice";
import { setToken } from "../feature/authSlice";

function MyDreamClubList() {
    const [show, setShow] = useState(false);
    const [playerId, setPlayerId] = useState();
    const [dataSearch, setDataSearch] = useState([]);
    const [result, setResult] = useState([]);
    const handleClose = () => {
        setShow(false);
        setResult([]);
        setDataSearch([]);
    };
    const handleShow = (id) => {
        setPlayerId(id);
        setShow(true);
    };
    const navigate = useNavigate();
    let username = localStorage.getItem("username");

    // REDUX
    const dispatch = useDispatch();
    const { loading, MyDreamClub, error } = useSelector((state) => state.myDreamClub);
    useEffect(() => {
        dispatch(setToken(localStorage.getItem("token")));
        dispatch(fetchMyDreamClub());
    }, [dispatch]);

    let data = MyDreamClub;
    const handleSearchChange = (event) => {
        setDataSearch(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await MyClubAPI({
                url: `/myDreamClub/searchPlayer?search=${dataSearch}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setResult(response.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                timer: 5000,
            });
        }
    };

    const handleCreate = async () => {
        navigate("/home/mydreamclub/create");
    };
    const handleDelete = async (id) => {
        try {
            const response = await MyClubAPI({
                url: `/myDreamClub/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            Swal.fire(response.data.message);
            navigate("/home/mydreamclub");
            dispatch(fetchMyDreamClub());
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                timer: 5000,
            });
        }
    };

    const setPlayer = async (id) => {
        try {
            const response = await MyClubAPI({
                url: "/myDreamClub/setPlayer",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {
                    idPlayer: playerId,
                    idRapidapi: id,
                },
            });
            Swal.fire(response.data.message);
            handleClose();
            dispatch(fetchMyDreamClub());
        } catch (error) {
            Swal.fire(error.message);
        }
    };

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (error) {
        return <Alert variant="danger">Errror : Someting wrong?</Alert>;
    }

    return (
        <>
            <Container className="mb-5">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header as="h4">My Dream Club</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <img
                                            style={{ width: "120px", height: "150px" }}
                                            src={
                                                data
                                                    ? data.logo
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVA1KDQ0BnT1fT-rFIK7yAy_Da1Vdbn7vceXe3sG8NCkdoM43-xA3GcASTy1DN_noXDh0&usqp=CAU"
                                            }
                                            alt="Profile"
                                            className="img-fluid rounded"
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <h3>{username}</h3>
                                        <p>
                                            Club:
                                            {data ? data.dream_club_name : "belum ada"}
                                        </p>
                                        {data ? (
                                            <Button
                                                variant="primary"
                                                onClick={() => handleDelete(data.id)}
                                            >
                                                Delete Club
                                            </Button>
                                        ) : (
                                            <Button variant="primary" onClick={handleCreate}>
                                                Add Club
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    {data?.MyPlayersLists ? (
                        data.MyPlayersLists.map((el) => (
                            <Col key={el.id} md={3} className="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={el.photo} />
                                    <Card.Body>
                                        <Card.Title>{el.nama}</Card.Title>
                                        <Button onClick={() => handleShow(el.id)} variant="primary">
                                            as {el.position}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <Card className="text-center">
                                <Card.Header style={{ paddingTop: "10px" }}>
                                    <div style={{ margin: "5px auto", maxWidth: "90%" }}>
                                        <img
                                            src="https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/03/10-greatest-managerial-rivalries-of-all-time-image.jpg"
                                            alt="Banner"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                                border: "1px solid #ddd",
                                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                            }}
                                        />
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Create your team</Card.Title>
                                    <Button variant="primary" onClick={handleCreate}>
                                        Lets go
                                    </Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">FIFA Lisence</Card.Footer>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Search Player</Form.Label>
                            <input
                                onChange={handleSearchChange}
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                name="searchPlayer"
                                value={dataSearch}
                            />
                        </Form.Group>
                        {result && result.length > 0 ? (
                            <Row className="flex-row flex-nowrap overflow-auto">
                                {result.map((el) => (
                                    <Col key={el.id} className="mb-2">
                                        <Card style={{ width: "14rem" }}>
                                            <Card.Img
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    margin: "auto",
                                                }}
                                                variant="top"
                                                src={el.playerImage}
                                            />
                                            <Card.Body className="text-center">
                                                <Card.Title style={{ fontSize: "0.8rem" }}>
                                                    {el.playerName}
                                                </Card.Title>
                                                <Card.Text style={{ fontSize: "0.7rem" }}>
                                                    {el.club}
                                                </Card.Text>
                                                <Button
                                                    onClick={() => setPlayer(el.id)}
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    SELECT
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p>No players found.</p>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyDreamClubList;
