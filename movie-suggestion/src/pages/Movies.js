import Header from "../modules/Header";
import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from "../App";
import Pagination from "../modules/Pagination";
import Loading from "../modules/Loading";

const imagepath = process.env.REACT_APP_POSTER_PATH
const discoverMovie = process.env.REACT_APP_MOVIE_LIST
const key = process.env.REACT_APP_API_KEY

const Movies = () => {
  const [movieList, setNewMovieList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const user = useContext(UserContext);
  const {movieGenre: genres} = user;

  const getMovieList = async() => {
    const movieListResponse = await fetch(discoverMovie)
    const jsonMovieList = await movieListResponse.json()
    setNewMovieList(jsonMovieList.results)
    setCurrentPage(jsonMovieList.page)
    setLastPage(jsonMovieList.total_pages)
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
    generateNewMoviesPage(pageNumber)
  }

  const generateNewMoviesPage = async(page) => {
    let discoverMovieLink = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&page=${page}`
    const newMovieList = await fetch(discoverMovieLink)
    const newMovieListResult = await newMovieList.json()
    setNewMovieList(newMovieListResult.results)
    setLoading(false)
  }

  const generateMovies = () => {
    if (movieList.length > 0) {
      return (
        movieList.map((movie) => {
          return (
            <div key={movie.id} className='movie'>
              <img className='image' alt={movie.title} src={imagepath + movie.poster_path}/>
              <div className='movieContent'>
                <div>{movie.title}</div> 
                <div>{getGenres(movie.genre_ids)}</div>
                <div>Release Date: {movie.release_date}</div>
                <div>{movie.overview}</div>
              </div>
            </div>
          )
        })
      )
    }
  }

  useEffect(() => {
    setLoading(true)
    getMovieList()
  }, [])

  return (
    <div>
      <Header/>
      {
        loading ? 
        <Loading/> :
        <div>
          <div>
           {generateMovies()}
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setPagination} lastPage={lastPage}/>
        </div>
      }
    </div>
  )
}

export default Movies;