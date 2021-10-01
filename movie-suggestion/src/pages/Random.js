import Header from "../modules/Header"
import { useContext } from "react"
import { SuggestContext } from "../App"
import { FaSpinner } from "react-icons/fa"

const imagepath = process.env.REACT_APP_POSTER_PATH

const Random = () => {
  const suggested = useContext(SuggestContext)
  const {suggestedMovie, genres, loading, isMovie} = suggested

  const getGenres = (genreIDs) => {
    if (loading || genreIDs === undefined) return ''
    let movieGenre = []
    genres.map((genre) => {
      if (genreIDs.includes(genre.id)) movieGenre.push(genre.name)
    })
    return movieGenre.join(', ')
  }
  
  return (
    <div>
      <Header/>
      {loading ? 
        <div className='loading'>
          <FaSpinner className='loading-img'/>
          Loading
        </div> :
        <div className='movie'>
          <img className='image' src={imagepath + suggestedMovie.poster_path}/>
          <div className='movieContent'>
            <div>{suggestedMovie.title}</div>
            <div>{getGenres(suggestedMovie.genre_ids)}</div>
            {
              isMovie ?
                <div>Release Date: {suggestedMovie.release_date}</div> :
                <div>First Air Date: {suggestedMovie.first_air_date}</div>
            }
            <div>{suggestedMovie.overview}</div>
          </div>
        </div>
      }
    </div>
  )
}

export default Random;