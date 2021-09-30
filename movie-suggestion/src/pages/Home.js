import Header from '../modules/Header';
import GenreOptions from '../modules/GenreOptions';
import Generator from '../modules/Generator';

const Home = (props) => {

  return(
    <div>
      <Header/>
      <Generator/>
      <GenreOptions/>
    </div>
  )
}

export default Home;