import React, { useState, useEffect } from "react";
import MyClubAPI from "../services/MyClubAPI";
import { Container, Card, Button, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../feature/authSlice";
import { searchClub } from "../feature/myClubSlice";
import Swal from "sweetalert2";

function AddClub() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, search, error } = useSelector((state) => state.myClub);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getsearchSearch = async () => {
    dispatch(setToken(localStorage.getItem("token")));
    dispatch(searchClub(searchQuery));
  };

  const handleSelect = async (id) => {
    try {
      const resp = await MyClubAPI({
        url: `/myClub`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          id: id,
        },
      });
      navigate("/home/myclub");
    } catch (error) {
      Swal("")
    }
  };

  const handleSearchClick = () => {
    getsearchSearch();
  };

  return (
    <>
      <Container>
        <div className="input-group mb-3 w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <Button onClick={handleSearchClick} variant="primary">
              Search
            </Button>
          </div>
        </div>
        <Container className="col">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : null}
          <Row>
            {search.length > 0 ? (
              search.map((club) => (
                <Col key={club.id}>
                  <Card style={{ width: "100%", margin: "10px 0" }}>
                    <Card.Img
                      variant="top"
                      src={club.logoImage}
                      alt={club.name}
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "10px" }}>
                        {club.name}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "8px" }}>
                        {club.competitionName}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleSelect(club.id)}
                      >
                        SELECT
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No results found</p>
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default AddClub;
