import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useState } from "react";

const Pagination = (props) => {
  const {currentPage, setCurrentPage, lastPage} = props
  const [actualCurrentPage, setActualCurrentPage] = useState(currentPage)

  const checkSetActuaCurrentPage = (newPageNumber) => {
    let pageNumber = parseInt(newPageNumber)
    if (!(pageNumber <= lastPage && pageNumber > 0)) return
    setActualCurrentPage(pageNumber)
  }

  const isEntered = (keyCode) => {
    if(keyCode === 13) {
      setCurrentPage(actualCurrentPage)
    }
  }

  const previousPage = () => {
    if (currentPage <= 1) return
    setCurrentPage(currentPage-1)
  }

  const nextPage = () => {
    if (currentPage === lastPage) return
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className='pagination'>
      <FaAngleLeft onClick={previousPage}/>
      <input
        className='page-number'
        type='number' 
        value={actualCurrentPage} 
        onChange={(event) => checkSetActuaCurrentPage(event.target.value)}
        onKeyDown={(event) => isEntered(event.keyCode)}></input>
      <div>of</div>
      <div>{lastPage}</div>
      <FaAngleRight onClick={nextPage}/>
    </div>
  )
}

export default Pagination;