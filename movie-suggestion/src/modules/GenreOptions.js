import React, {useContext} from 'react';
import { UserContext } from '../App'

const GenreOptions = () => {
  const user = useContext(UserContext);
  const {isMovie, movieGenre, tvGenre, addSelectedGenre, resetSelectedGenres, setMovieOption} = user

  const generateMovieGenres = movieGenre.map((genre) => {
    const key = `${genre.name}-${genre.id}`
    return <div className='genreButton' onClick={(event) => addSelectedGenre(event.target.textContent)} key={key}>{genre.name}</div>
  })

  const generateTVGenres = tvGenre.map((genre) => {
    const key = `${genre.name}-${genre.id}`
    return <div className='genreButton' onClick={(event) => addSelectedGenre(event.target.textContent)} key={key}>{genre.name}</div>
  })

  const setMovieGenre = () => {
    if (!isMovie) resetSelectedGenres()
    setMovieOption(true)
  }

  const setTVGenre = () => {
    if (isMovie) resetSelectedGenres()
    setMovieOption(false)
  }

  return (
    <div className='App-genres'>
      <div className='App-options'>
        <div className={isMovie ? 'selected' : 'showType'} onClick={setMovieGenre}>
          Movie Genres
        </div>
        <div className={isMovie ? 'showType' : 'selected'}  onClick={setTVGenre}>
          TV Series Genres
        </div>
      </div>

      <div className='quotes'>Choose a genre that you would like to base the generator</div>
      { user.isMovie ? 
        <div className='Genres'>{generateMovieGenres}</div> : 
        <div className='Genres'>{generateTVGenres}</div>
      }
    </div>
  )
}

export default GenreOptions;