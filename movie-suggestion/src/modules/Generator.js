import React, {useContext} from 'react';
import { UserContext } from '../App'

const Generator = (props) => {
  const user = useContext(UserContext);

  return (
    <div className='App-generator'>
      <div>
        Surprise yourself!
      </div>
      <div onClick={(event) => user.generateMovieTV()}>Generate</div>
    </div>
  )
}

export default Generator;