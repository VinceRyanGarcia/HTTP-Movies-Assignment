import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initMovie = {
    title: "",
    director: "",
    metascore: '',
    stars: []
}

export default function AddMovieFrom( props ){
    const [ movie, setMovie ] = useState( initMovie );

    const history = useHistory();
    const { setMovieList } = props;

    const handleChange = e => {
        e.persist();
        if( e.target.name === 'metascore'){
            e.target.value = parseInt( e.target.value, 10 );
        }
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newMovie = {
            ...movie,
            stars: movie.stars.split(', ')
        }
        axios.post( 'http://localhost:5000/api/movies', newMovie)
            .then( res => {
                setMovieList( res.data )
                history.push('/');
            })
    }
  return(
    <div className="update-container">
        <h2>Add Movie</h2>
        <form onSubmit={ handleSubmit } >
            <label>Title: <input type="text" name="title" onChange={ handleChange } placeholder="Movie Title" value={ movie.title }/></label>
            <label>Director: <input type="text" name="director" onChange={ handleChange } placeholder="Director" value={ movie.director }/></label>
            <label>MetaScore: <input type="number" name="metascore" min="0" max="100" onChange={ handleChange } placeholder="0" value={ movie.metascore }/></label>
            <label>Stars: <input type="text" name="stars" onChange={ handleChange } placeholder="Stars - separated by commas" value={ movie.stars }/></label>
            <button>Add Movie</button>
        </form>
    </div>
  );
}