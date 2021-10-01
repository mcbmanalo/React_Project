import Header from "../modules/Header";
import React, {useState, useContext, useEffect} from 'react';
import { MovieContext, UserContext } from "../App";
import Pagination from "../modules/Pagination";

const imagepath = process.env.REACT_APP_POSTER_PATH
const key = process.env.REACT_APP_API_KEY


const TVSeries = () => {
  const [currentPage, setCurrentPage] = useState(0) // this will be used for pagination later
  const tvSeries = useContext(MovieContext);
  const user = useContext(UserContext);
  const {tvGenre:genres} = user;
  const {tvList, setNewTVList} = tvSeries

  const getGenres = (genreIDs) => {
    let movieGenre = []
    genres.map((genre) => {
      if (genreIDs.includes(genre.id)) movieGenre.push(genre.name)
    })
    return movieGenre.join(', ')
  }

  const setPagination = (pageNumber) => {
    setCurrentPage(pageNumber)
    generateNewTVPage(pageNumber)
  }

  const generateNewTVPage = async(page) => {
    let discoverTVLink = `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&page=${page}`
    const newTVList = await fetch(discoverTVLink)
    const newTVListResult = await newTVList.json()
    setNewTVList(newTVListResult)
  }

  const generateTVSeries = tvList.results.map((series) => {
    return (
      <div key={series.id} className='movie'>
        <img className='image' alt={series.name} src={imagepath + series.poster_path}/>
        <div className='movieContent'>
          <div>{series.name}</div> 
          <div>{getGenres(series.genre_ids)}</div>
          <div>First Air Date: {series.first_air_date}</div>
          <div>{series.overview}</div>
        </div>
      </div>
    )
  })

  useEffect(() => {
    setCurrentPage(tvList.page)
  }, [])

  return (
    <div className='App'>
      <Header />
      <div>
        {generateTVSeries}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setPagination} lastPage={tvList.total_pages}/>
    </div>
  )
}

export default TVSeries;