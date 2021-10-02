import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from '../App'

const Generator = () => {
  const user = useContext(UserContext);
  const {selectedGenres, generateMovieTV, isMaxGenre} = user
  const [isSelectedGenreEmpty, setIsSelectedGenre] = useState(true)

  const setSelectedGenres = () => {
    const userSelectedGenres = selectedGenres.map(genre => genre.name)
    return (
      <div className='selectedGenres'>Selected Genres: {userSelectedGenres.join(', ')}</div>
    )
  }

  const checkSelectedGenre = () => {
    if (selectedGenres.length > 0) return setIsSelectedGenre(false)
    return setIsSelectedGenre(true)
  }

  useEffect(() => {
    checkSelectedGenre()
  }, [selectedGenres])

  return (
    <div className='App-generator'>
      <div className='quotes' onClick={generateMovieTV}>
        Surprise yourself!
        {isSelectedGenreEmpty ? <div></div> : setSelectedGenres()}
        { isMaxGenre ? <div className='error'>Reached max number of allowable genres. (max 3)</div> :
          <div></div>
        }
      </div>
    </div>
  )
}

export default Generator;