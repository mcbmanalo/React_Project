import React, {useContext} from 'react';
import { UserContext } from '../App'

const Generator = (props) => {
  const user = useContext(UserContext);

  return (
    <div className='App-generator'>
      <div className='quotes' onClick={user.generateMovieTV}>
        Surprise yourself!
      </div>
    </div>
  )
}

export default Generator;