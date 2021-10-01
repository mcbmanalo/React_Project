import { 
  Link,
} from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa'


const Header = () => {
  return (
    <div className='App-header'>
      <div className='App-image'>
        <div>
          What to
        </div>
        <FaPlayCircle/>
      </div>

      <div className='App-pages'>
        <Link className='link' to='/'>Home</Link>
        <Link className='link' to='/movies'>Movies</Link>
        <Link className='link' to='/tv-series'>TV Series</Link>
      </div>

    </div>
  )
}

export default Header;