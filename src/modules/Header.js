import { 
  useHistory,
} from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa'


const Header = (props) => {
  const {resetSelectedGenres} = props
  const history = useHistory();

  const goToHome = () => {
    history.push('/')
    resetSelectedGenres()
  }

  
  const goToMovies = () => {
    history.push('/movies')
    resetSelectedGenres()
  }

  
  const goToTVSeries = () => {
    history.push('/tv-series')
    resetSelectedGenres()
  }


  return (
    <div className='App-header'>
      <div className='App-image'>
        <div>
          What to
        </div>
        <FaPlayCircle/>
      </div>

      <div className='App-pages'>
        <div onClick={goToHome}>Home</div>
        <div onClick={goToMovies}>Movies</div>
        <div onClick={goToTVSeries}>TV Series</div>
      </div>

    </div>
  )
}

export default Header;