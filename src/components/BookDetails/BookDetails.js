import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Navbar from '../Navbar/Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const BookDetails = props => {
  const [api, setApi] = useState(apiStatusConstants.initial)
  const [bookData, setBookData] = useState({})
  const fetchData = async () => {
    setApi(apiStatusConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      setApi(apiStatusConstants.success)
      const camelCaseData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
        aboutAuthor: data.book_details.about_author,
      }
      setBookData(camelCaseData)
    } else {
      setApi(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tryAgainButton = () => {
    fetchData()
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookData

    return (
      <div className="book-details-bg">
        <div className="book-details-card">
          <div className="details">
            <img src={coverPic} alt={title} className="book-details-img" />
            <div className="book-details-container">
              <h1 className="book-details-title">{title}</h1>
              <p className="book-details-author">{authorName}</p>
              <div className="rating-div">
                <p className="book-details-avg">Avg Rating </p>
                <BsFillStarFill size="15" color="#FBBF24" />
                <p className="book-details-rating">{rating}</p>
              </div>
              <p className="book-details-status">
                Status:
                <span className="book-details-read"> {readStatus}</span>
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h1 className="about-heading">About Author</h1>
            <p className="about-para">{aboutAuthor}</p>
            <h1 className="about-heading">About Book</h1>
            <p className="about-para">{aboutBook}</p>
          </div>
        </div>
        <div className="icons-div">
          <FaGoogle className="icon" />
          <FaTwitter className="icon" />
          <FaInstagram className="icon" />
          <FaYoutube className="icon" />
          <p>Contact Us</p>
        </div>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1692170100/error_rsfepp.png"
        alt="failure view"
        className="error-image"
      />
      <p className="error-para">Something went wrong, Please try again.</p>
      <button type="button" className="try-again-btn" onClick={tryAgainButton}>
        Try Again
      </button>
    </div>
  )

  const renderSwitchView = () => {
    switch (api) {
      case apiStatusConstants.loading:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div>
      <Navbar />
      <div>{renderSwitchView()}</div>
    </div>
  )
}

export default BookDetails
