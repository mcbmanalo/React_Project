import { FaSpinner } from "react-icons/fa"

const Loading = () => {
  return (
    <div className='loading'>
      <FaSpinner className='loading-img'/>
      Loading
    </div>
  )
}

export default Loading;