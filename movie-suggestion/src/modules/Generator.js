
const Generator = (props) => {
  let {generateMovieTV} = props
  
  return (
    <div className='App-generator'>
      <div>
        Surprise yourself!
      </div>
      <div onClick={(event) => generateMovieTV()}>Generate</div>
    </div>
  )
}

export default Generator;