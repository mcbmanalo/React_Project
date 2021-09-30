import './App.css';
import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Random from './pages/Random';

export const UserContext = React.createContext();
export const MovieContext = React.createContext();
// const key = process.env.REACT_APP_API_KEY
const movieGenreLink = process.env.REACT_APP_MOVIE_GENRE_URI
const tvGenreLink = process.env.REACT_APP_TV_GENRE_URI
const discoverMovie = process.env.REACT_APP_MOVIE_LIST // try moving the fetching data of movies to movie page later
const discoverTV = process.env.REACT_APP_TV_LIST // try moving the fetching data of movies to tv series page later

const UserProvider = (props) => {
  const {children, generateMovieTV, addSelectedGenre, genres} = props
  return (
    <UserContext.Provider value={{generateMovieTV, addSelectedGenre, genres}}>
      {children}
    </UserContext.Provider>
  )
}

const MovieProvider = (props) => {
  const {children, movieList, tvList} = props
  return (
    <MovieContext.Provider value={{movieList, tvList}}>
      {children}
    </MovieContext.Provider>
  )
}

const getUniqueList = (list, key) => {
  return [...new Map(list.map(item => [item[key], item])).values()]
}

const testGenre = (list1, list2) => {
  let newList = [...list1]
  list2.map((item) => {
    newList.push(list1.find(list1Item => list1Item.id === item.id))
  })
  console.log('Test Log')
  console.log(newList)
}

function App() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setListofGenres] = useState([])
  const [movieList, setMovieList] = useState([])
  const [tvList, settvList] = useState([])

  const addSelectedGenres = (genre) => {
    if (selectedGenres.includes(genre)) return
    let chosenGenre = [...selectedGenres]
    genres.map((genreItem) => {
      if (genreItem.name === genre) return chosenGenre.push(genreItem)
      return null
    })
    console.log(chosenGenre)
    setSelectedGenres(chosenGenre)
  }

  const getGenres = async() => {
    const movieResponse = await fetch(movieGenreLink)
    const tvResponse = await fetch(tvGenreLink)
    const jsonMovie = await movieResponse.json()
    const jsonTV = await tvResponse.json()
    const listOfGenres = [...jsonMovie.genres, ...jsonTV.genres]
    testGenre(jsonMovie.genres, jsonTV.genres)
    setListofGenres(getUniqueList(listOfGenres, 'id'))
  }

  const getMovieList = async() => {
    const movieListResponse = await fetch(discoverMovie)
    const jsonMovieList = await movieListResponse.json()
    setMovieList(jsonMovieList) 
  }
  
  const getTVList = async() => {
    const TVListResponse = await fetch(discoverTV)
    const jsonTVList = await TVListResponse.json()
    settvList(jsonTVList) 
  }

  const generateMovieTV = () => {
    console.log('Add code for choosing random movie')
  }

  useEffect(() => {
    getGenres()
    getMovieList()
    getTVList()
  }, [])
  return (
    <UserProvider generateMovieTV={generateMovieTV} addSelectedGenre={addSelectedGenres} genres={genres}>
      <Router>
        <div className='App'>
          <Switch>
            <Route path="/" component={Home} exact/>
            <MovieProvider movieList={movieList} tvList={tvList}>
              <Route path="/movies" component={Movies}/>
              <Route path="/tv-series" component={TVSeries}/>
              <Route path="/suggest" component={Random} />
            </MovieProvider>
          </Switch>
          <div className='TMDb'>
            <div>
              This product uses the TMDB API but is not endorsed or certified by TMDB
            </div>
            <img className='TMDB-logo' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'/>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
