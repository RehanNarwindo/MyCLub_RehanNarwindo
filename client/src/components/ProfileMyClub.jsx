import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import MyClubAPI from "../services/MyClubAPI";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../feature/authSlice";
import { deleteMyClub, fetchMyClub } from "../feature/myClubSlice";

function ProfileMyClub() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, myClub, error, deleteResponse } = useSelector(
    (state) => state.myClub
  );

  let username = localStorage.getItem("username");

  // REDUX
  useEffect(() => {
    dispatch(setToken(localStorage.getItem("token")));
    dispatch(fetchMyClub());
  }, [dispatch]);

  const handleAddPage = async () => {
    navigate("/home/myclub/add");
  };

  const handleDelete = (id) => {
    dispatch(setToken(localStorage.getItem("token")));
    dispatch(deleteMyClub(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: deleteResponse,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            response.error.message ||
            "Something went wrong! Unable to delete club.",
        });
      }
    });
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
              <Card.Header as="h4">My Club</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <img
                      style={{ width: "120px", height: "150px" }}
                      src={
                        myClub?.myclub?.club_logo ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={8}>
                    <h3>{username}</h3>
                    <p>Club: {myClub?.myclub?.club_name}</p>
                    {myClub.mainFacts ? (
                      <Button
                        variant="primary"
                        onClick={() => handleDelete(myClub.myclub.id)}
                      >
                        Delete Club
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleAddPage()}>
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
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Header as="h4">News MyClub</Card.Header>
              {myClub.news && myClub.news.length > 0 ? (
                myClub.news.map((el) => (
                  <Card.Body key={el.id}>
                    <Card.Subtitle>{el.newsDate}</Card.Subtitle>
                    <Card.Text>{el.newsHeadline}</Card.Text>
                  </Card.Body>
                ))
              ) : (
                <Card.Body>
                  <Card.Text>No news available.</Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfileMyClub;
