import React, {useContext} from 'react';
import { UserContext } from '../App'

const GenreOptions = () => {
  const user = useContext(UserContext);

  const generateMovieGenres = user.movieGenre.map((genre) => {
    const key = `${genre.name}-${genre.id}`
    return <div onClick={(event) => user.addSelectedGenre(event.target.textContent)} key={key}>{genre.name}</div>
  })

  const generateTVGenres = user.tvGenre.map((genre) => {
    const key = `${genre.name}-${genre.id}`
    return <div onClick={(event) => user.addSelectedGenre(event.target.textContent)} key={key}>{genre.name}</div>
  })

  const setMovieGenre = () => {
    if (!user.isMovie) user.resetSelectedGenres([])
    user.setMovieOption(true)
  }

  const setTVGenre = () => {
    if (user.isMovie) user.resetSelectedGenres([])
    user.setMovieOption(false)
  }

  return (
    <div className='App-genres'>
      <div className='App-options'>
        <div onClick={setMovieGenre}>
          Movie Genres
        </div>
        <div onClick={setTVGenre}>
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