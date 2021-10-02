import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from '../App'

const Generator = () => {
  const user = useContext(UserContext);
  const [isSelectedGenreEmpty, setIsSelectedGenre] = useState(true)

  const setSelectedGenres = () => {
    const selectedGenres = user.selectedGenres.map(genre => genre.name)
    return (
      <div className='selectedGenres'>Selected Genres: {selectedGenres.join(', ')}</div>
    )
  }

  const checkSelectedGenre = () => {
    if (user.selectedGenres.length > 0) return setIsSelectedGenre(false)
    return setIsSelectedGenre(true)
  }

  useEffect(() => {
    checkSelectedGenre()
  }, [user.selectedGenres])

  return (
    <div className='App-generator'>
      <div className='quotes' onClick={user.generateMovieTV}>
        Surprise yourself!
        {isSelectedGenreEmpty ? <div></div> : setSelectedGenres()}
      </div>
    </div>
  )
}

export default Generator;