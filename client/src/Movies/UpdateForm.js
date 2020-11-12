import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateForm({ movieList, setMovieList }) {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: [],
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        setMovieList([...movieList, res.data]);
        push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Movie Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={movie.title}
        />
        <label>Movie Director:</label>
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChange}
          value={movie.director}
        />
        <label>Movie Metascore:</label>
        <input
          type="number"
          name="metascore"
          placeholder="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />
        <label>Movie Stars:</label>
        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={handleChange}
          value={movie.stars}
        />
        <button>Update Movie</button>
      </form>
    </div>
  );
}

export default UpdateForm;
