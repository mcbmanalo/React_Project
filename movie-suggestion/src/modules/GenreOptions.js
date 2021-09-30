import React, {useContext} from 'react';
import { UserContext } from '../App'

const GenreOptions = () => {

  const user = useContext(UserContext);

  const generateGenres = user.genres.map((genre) => {
    const key = `${genre.name}-${genre.id}`
    return <div onClick={(event) => user.addSelectedGenre(event.target.textContent)} key={key}>{genre.name}</div>
  })

  return (
    <div className='App-genres'>
      <div>Choose a genre that you would like to base the generator</div>
      <div className='Genres'>
        {generateGenres}
      </div>
    </div>
  )
}

export default GenreOptions;