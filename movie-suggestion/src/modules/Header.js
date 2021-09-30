import { 
  Link,
} from 'react-router-dom';


const Header = () => {
  return (
    <div className='App-header'>
      <div className='App-image'>
        <label>Image</label>
      </div>

      <div className='App-pages'>
        <Link to='/'>Home</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/tv-series'>TV Series</Link>
      </div>

    </div>
  )
}

export default Header;