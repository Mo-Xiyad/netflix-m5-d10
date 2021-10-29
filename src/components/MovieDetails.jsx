import { format, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const MovieDetails = ({ match }) => {
  const movieiD = match.params.movieId;

  const [movieData, setMovieData] = useState(null);
  const [movieComment, setMovieComment] = useState(null);

  const fetchMovie = async () => {
    let url = `http://www.omdbapi.com/?apikey=2470e3c&i=${movieiD}`;
    try {
      const response = await fetch(url);

      const data = await response.json();

      if (response.ok) {
        setMovieData(data);
        console.log(data);
      } else {
        console.log("inside the else of Fetch");
      }
    } catch (e) {
      console.log(e);
      console.log("outside the try block");
    }
  };

  const fetchMovieComments = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjFlNjRiYjUzZDAwMTViMTllZDYiLCJpYXQiOjE2MzM1NDEzNzEsImV4cCI6MTYzNDc1MDk3MX0.vNKpyht5gUpAzMlt4yhrbDl7C5CbMc1xGKoEUPk1aBg"
    );

    //     headers: {
    //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjFlNjRiYjUzZDAwMTViMTllZDYiLCJpYXQiOjE2MzM1NDEzNzEsImV4cCI6MTYzNDc1MDk3MX0.vNKpyht5gUpAzMlt4yhrbDl7C5CbMc1xGKoEUPk1aBg"
    //     }

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${movieiD}`,
        {
          headers: myHeaders,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMovieComment(data);
        // console.log(data);
      } else {
        console.log("Movei comments Err Fetch");
      }
    } catch (e) {
      console.log(e);
      console.log("Movei comments Err 500");
    }
  };

  useEffect(() => {
    fetchMovieComments();

    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Movie details</h1>
      {typeof movieData === "undefined" ? (
        <h1> move not found</h1>
      ) : !movieData ? (
        <h1> move loading</h1>
      ) : (
        <Row className="justify-content-center">
          <Col className="col-6 col-md-4 px-1 py-3">
            <div className="card-text-area">
              <img class="img-fluid rounded" src={movieData.Poster} alt="" />

              <p>
                <small>{movieData.Title}</small>
              </p>
            </div>
          </Col>
        </Row>
      )}
      {typeof movieComment === "undefined" ? (
        <h1> move not found</h1>
      ) : !movieComment ? (
        <h1> move loading</h1>
      ) : (
        movieComment.map((movie) => (
          <Row className="justify-content-center" key={movie._id}>
            <Col className="col-6 col-md-4 px-1 py-3">
              <ListGroup className="text-dark">
                <ListGroup.Item>{movie.comment}</ListGroup.Item>
                <ListGroup.Item>
                  {format(parseISO(movie.createdAt), "MMMM do yyyy | HH:mm")}
                </ListGroup.Item>
                <ListGroup.Item>{movie.rate}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        ))
      )}
    </>
  );
};

export default MovieDetails;
