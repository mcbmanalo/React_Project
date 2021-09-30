import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'

const Generator = (props) => {
  const user = useContext(UserContext);

  return (
    <div className='App-generator'>
      <div>
        Surprise yourself!
      </div>
      <Link className='link' to='/suggest' onClick={(event) => user.generateMovieTV()}>Generate</Link>
    </div>
  )
}

export default Generator;