import Header from "../modules/Header";
import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from "../App";
import Pagination from "../modules/Pagination";
import Loading from "../modules/Loading";

const imagepath = process.env.REACT_APP_POSTER_PATH
const discoverTV = process.env.REACT_APP_TV_LIST 
const key = process.env.REACT_APP_API_KEY

const TVSeries = () => {
  const [tvList, setNewTVList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // this will be used for pagination later
  const [lastPage, setLastPage] = useState(1)
  const user = useContext(UserContext);
  const {tvGenre:genres} = user;

  const getTVList = async() => {
    const tvListResponse = await fetch(discoverTV)
    const jsonTVList = await tvListResponse.json()
    setNewTVList(jsonTVList.results)
    setCurrentPage(jsonTVList.page)
    setLastPage(jsonTVList.total_pages)
    setLoading(false)
  }

  const getGenres = (genreIDs) => {
    let movieGenre = []
    genres.map((genre) => {
      if (genreIDs.includes(genre.id)) movieGenre.push(genre.name)
    })
    return movieGenre.join(', ')
  }

  const setPagination = (pageNumber) => {
    setLoading(true)
    setCurrentPage(pageNumber)
    generateNewTVPage(pageNumber)
  }

  const generateNewTVPage = async(page) => {
    let discoverTVLink = `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&page=${page}`
    const newTVList = await fetch(discoverTVLink)
    const newTVListResult = await newTVList.json()
    setNewTVList(newTVListResult.results)
    setLoading(false)
  }

  const generateTVShows = () => {
    if (tvList.length > 0) {
      return (
        tvList.map((series) => {
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
      )
    }
  }

  useEffect(() => {
    setLoading(true)
    getTVList()
  }, [])

  return (
    <div className='App'>
      {
        loading ? 
        <Loading/> :
        <div>
          <div>
            {generateTVShows()}
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setPagination} lastPage={lastPage}/>
        </div>
      }
    </div>
  )
}

export default TVSeries;