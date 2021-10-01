import Header from "../modules/Header";
import React, {useState, useContext, useEffect} from 'react';
import { MovieContext, UserContext } from "../App";
import Pagination from "../modules/Pagination";

const imagepath = process.env.REACT_APP_POSTER_PATH
const discoverMovie = process.env.REACT_APP_MOVIE_LIST
const key = process.env.REACT_APP_API_KEY

const Movies = () => {
  // Trying to re-create problem
  const [movieList, setNewMovieList] = useState([]) // this will contain the movies from API

  const [currentPage, setCurrentPage] = useState(0) // this will be used for pagination later
  const movies = useContext(MovieContext);
  const user = useContext(UserContext);
  const {movieGenre: genres} = user;
  // const {movieList, setNewMovieList} = movies // commented this for now to re-create problem

  // Added this function to fetch data from API
  const getMovieList = async() => {
    const movieListResponse = await fetch(discoverMovie)
    const jsonMovieList = await movieListResponse.json()
    console.log(jsonMovieList)
    setNewMovieList(jsonMovieList) 
  }

  const getGenres = (genreIDs) => {
    let movieGenre = []
    genres.map((genre) => {
      if (genreIDs.includes(genre.id)) movieGenre.push(genre.name)
    })
    return movieGenre.join(', ')
  }

  const setPagination = (pageNumber) => {
    setCurrentPage(pageNumber)
    generateNewMoviesPage(pageNumber)
  }

  const generateNewMoviesPage = async(page) => {
    let discoverMovieLink = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&page=${page}`
    const newMovieList = await fetch(discoverMovieLink)
    const newMovieListResult = await newMovieList.json()
    setNewMovieList(newMovieListResult)
  }

  const generateMovies = movieList.results.map((movie) => {
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

  useEffect(() => {
    // From initial load must load movieList from API
    getMovieList()
    
    setCurrentPage(movieList.page)
  }, [])

  return (
    <div>
      <Header/>
      <div>
        {generateMovies}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setPagination} lastPage={movieList.total_pages}/>
    </div>
  )
}

export default Movies;