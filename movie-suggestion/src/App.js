import logo from './logo.svg';
import './App.css';
import Header from './modules/Header';
import GenreOptions from './modules/GenreOptions';
import Generator from './modules/Generator';
import { useState } from 'react';


const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery']

function App() {
  const [selectedGenres, setSelectedGenres] = useState([])

  const addSelectedGenres = (genre) => {
    if (selectedGenres.includes(genre)) return
    let newSelectedGenres = [...selectedGenres]
    newSelectedGenres.push(genre)
    console.log(newSelectedGenres)
    setSelectedGenres(newSelectedGenres)
  }

  const generateMovieTV = () => {
    console.log('Add code for choosing random movie')
  }

  return (
    <div className="App">
      <Header/>
      
      <Generator generateMovieTV={generateMovieTV} />

      <GenreOptions addSeletectedGenre={addSelectedGenres} genres={genres} />
    </div>
  );
}

export default App;
