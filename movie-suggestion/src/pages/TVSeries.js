import Header from "../modules/Header";
import React, {useState, useContext, useEffect} from 'react';
import { MovieContext, UserContext } from "../App";

const imagepath = process.env.REACT_APP_POSTER_PATH

const TVSeries = () => {
  const [currentPage, setCurrentPage] = useState(0) // this will be used for pagination later
  const tvSeries = useContext(MovieContext);
  const user = useContext(UserContext);
  const {genres} = user;
  const {tvList} = tvSeries

  const getGenres = (genreIDs) => {
    let movieGenre = []
    genres.map((genre) => {
      if (genreIDs.includes(genre.id)) movieGenre.push(genre.name)
    })
    return movieGenre.join(', ')
  }

  const generateTVSeries = tvList.results.map((series) => {
    return (
      <div key={series.id} className='movie'>
        <img className='image' src={imagepath + series.poster_path}/>
        <div className='movieContent'>
          <div>{series.original_title}</div> 
          <div>{getGenres(series.genre_ids)}</div>
          <div>Release Date: {series.release_date}</div>
          <div>{series.overview}</div>
        </div>
      </div>
    )
  })

  useEffect(() => {
    console.log(tvList.page)
    setCurrentPage(tvList.page)
  }, [])

  return (
    <div className='App'>
      <Header />
      <div>
        {generateTVSeries}
      </div>
    </div>
  )
}

export default TVSeries;