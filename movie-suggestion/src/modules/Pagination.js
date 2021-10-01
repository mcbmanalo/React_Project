import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const key = process.env.REACT_APP_API_KEY

const Pagination = (props) => {
  const {currentPage, setCurrentPage, lastPage} = props

  const setNewPage = (newPageNumber) => {
    let pageNumber = parseInt(newPageNumber)
    if (!(pageNumber <= lastPage && pageNumber > 0)) return
    setTimeout(10)
    setCurrentPage(parseInt(newPageNumber))
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
      <input className='page-number' type='number' value={currentPage} onChange={(event) => setNewPage(event.target.value)}></input>
      <div>of</div>
      <div>{lastPage}</div>
      <FaAngleRight onClick={nextPage}/>
    </div>
  )
}

export default Pagination;