import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const editMovie = e => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`)
  }

  const deleteMovie = () => {
    axios.delete( `http://localhost:5000/api/movies/${ params.id }`)
    .then( res => {
      history.push('/')
    })
    .catch( err => console.log( err ) );
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={ editMovie }>Edit Movie</button>
      <button onClick={ deleteMovie }>Delete Movie</button>
    </div>
  );
}

export default Movie;