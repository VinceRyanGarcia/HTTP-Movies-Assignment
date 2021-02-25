import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie ={
    title: "",
    director: "",
    metascore: 0,
}

export default function UpdateMovieForm( props ){
    const [ movie, setMovie ] = useState( initialMovie );
    const { movieList, setMovieList } = props;
    const { id } = useParams();
    const history = useHistory();


    const handleChange = e => {
        e.persist();        
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    useEffect( () => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then( res => {
                setMovie( res.data );
            })
            .catch( err => console.log( err ) );
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${ id }`, movie )
            .then( res => {
                setMovieList( [ ...movieList, res.data ] )
                history.push(`/`)
            })
            .catch( err => console.log( err ) );
    }

  return(
    <div className="update-container">
        <h2>Update {movie.title}</h2>
        <form onSubmit={ handleSubmit }> 
            <label>Movie Title: <input type="text" name="title" onChange={handleChange} value={ movie.title } placeholder="Movie Title" /></label>
            <label>Director: <input type="text" name="director" onChange={handleChange} value={ movie.director } placeholder="Director" /></label>
            <label>MetaScore: <input type="number" name="metascore" min="0" max="100" onChange={handleChange} value={ movie.metascore } placeholder="0" /></label>
            <button>Submit</button>
        </form>
    </div>
  );
}