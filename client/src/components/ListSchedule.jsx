import { useEffect } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedule } from "../feature/scheduleSlice";

function ListSchedule() {
  const dispatch = useDispatch();
  const { loading, schedule, error } = useSelector((state) => state.schedule);
  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (error) {
    return (
      <Alert variant="danger" role="status">
        <span className="visually-hidden">Error : Someting wrong?</span>
      </Alert>
    );
  }

  return (
    <Container className="w-50">
      <Row>
        {schedule.map((el) => (
          <Col key={el.id} md={12} className="mb-4">
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={4} className="text-center">
                    <Card.Img
                      variant="top"
                      src={el.homeClubImage}
                      alt={el.homeClubName}
                      style={{ maxWidth: "50px" }}
                    />
                    <Card.Title>{el.homeClubName}</Card.Title>
                  </Col>
                  <Col md={4} className="text-center">
                    <Card.Title style={{ fontSize: 60 }}>
                      {el.result}
                    </Card.Title>
                    <Card.Title>vs</Card.Title>
                    <Card.Title>
                      {el.fullMatchDate} at {el.matchTime}
                    </Card.Title>
                  </Col>
                  <Col md={4} className="text-center">
                    <Card.Img
                      variant="top"
                      src={el.awayClubImage}
                      alt={el.awayClubName}
                      style={{ maxWidth: "50px" }}
                    />
                    <Card.Title>{el.awayClubName}</Card.Title>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListSchedule;
