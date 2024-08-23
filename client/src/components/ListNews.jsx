import { useEffect } from "react";
import {
  Card,
  Container,
  Row,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../feature/newsSlice";

function ListNews() {
  const dispatch = useDispatch();
  const { isLoading, news, error } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">Error : Something wrong?</Alert>;
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {news.map((el) => (
          <Card
            className="m-3 d-flex justify-content-center"
            style={{ width: "18rem" }}
            key={el.id}
          >
            <Card.Img variant="top" src={el.newsFirstImage} />
            <Card.Body>
              <Card.Text>{el.newsHeadline}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>date: {el.fullNewsDate}</ListGroup.Item>
              <ListGroup.Item>source: {el.newsSource}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default ListNews;
