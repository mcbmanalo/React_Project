import Header from "../modules/Header";
import React, {useContext, useEffect} from 'react';
import { MovieContext } from "../App";

const imagepath = process.env.REACT_APP_POSTER_PATH

const Movies = () => {
  const movies = useContext(MovieContext);
  const {movieList} = movies

  useEffect(() => {
    console.log(movieList.results)
  }, [])

  const generateMovies = movieList.results.map((movie) => {
    return (
      <div>
        <img className='image' src={imagepath + movie.poster_path}/>
        {movie.original_title}
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