import Header from "../modules/Header";
import React, {useContext, useEffect} from 'react';
import { MovieContext, UserContext } from "../App";

const imagepath = process.env.REACT_APP_POSTER_PATH

const Movies = () => {
  const movies = useContext(MovieContext);
  const user = useContext(UserContext);
  const {genres} = user;
  const {movieList} = movies

  useEffect(() => {
  }, [])

  const getGenres = (genreIDs) => {
    let movieGenre = []
    genres.map((genre) => {
      if (genreIDs.includes(genre.id)) movieGenre.push(genre.name)
    })
    return movieGenre.join(', ')
  }

  const generateMovies = movieList.results.map((movie) => {
    return (
      <div key={movie.id} className='movie'>
        <img className='image' src={imagepath + movie.poster_path}/>
        <div className='movieContent'>
          <div>{movie.original_title}</div> 
          <div>{getGenres(movie.genre_ids)}</div>
          <div>Release Date: {movie.release_date}</div>
          <div>{movie.overview}</div>
        </div>
      </div>
    )
  })

  return (
    <div>
      <Header/>
      <div>
        {generateMovies}
      </div>
    </div>
  )
}

export default Movies;