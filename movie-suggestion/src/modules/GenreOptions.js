
const GenreOptions = (props) => {
  let {genres, addSeletectedGenre} = props;

  const generateGenres = genres.map((genre, index) => {
    const key = `${genre}-${index}`
    return <div onClick={(event) => addSeletectedGenre(event.target.textContent)} key={key}>{genre}</div>
  })

  return (
    <div className='App-genres'>
      <div>Choose a genre that you would like to base the generator</div>
      <div className='Genres'>
        {generateGenres}
      </div>
    </div>
  )
}

export default GenreOptions;