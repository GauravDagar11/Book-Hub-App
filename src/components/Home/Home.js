import {useEffect, useState} from 'react'
import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Navbar from '../Navbar/Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = props => {
  const [api, setApi] = useState(apiStatusConstants.initial)
  const [booksData, setBooksData] = useState([])

  const fetchData = async () => {
    setApi(apiStatusConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      setBooksData(data.books)
    } else {
      setApi(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const findBooksButton = () => {
    const {history} = props
    history.push('/shelf')
  }

  const tryAgainButton = () => {
    fetchData()
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    className: 'Silk',
  }

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 3,
    className: 'Silk',
  }

  const renderSuccessView = () => (
    <div>
      <div className="carousel-head-btn">
        <h1 className="top-rated-books-head"> Top Rated Books </h1>
        <button
          type="button"
          className="find-books-btn"
          onClick={findBooksButton}
        >
          Find Books
        </button>
      </div>
      <Slider {...settings1} className="slider-bg">
        {booksData.map(eachItem => (
          <div className="silk-div">
            <img
              src={eachItem.cover_pic}
              alt={eachItem.title}
              className="top-rated-books-img"
            />
            <h1 className="top-rated-books-title">{eachItem.title}</h1>
            <p className="top-rated-books-author">{eachItem.author_name}</p>
          </div>
        ))}
      </Slider>
      <Slider {...settings2} className="slider-sm">
        {booksData.map(eachItem => (
          <div className="silk-div">
            <img
              src={eachItem.cover_pic}
              alt={eachItem.title}
              className="top-rated-books-img"
            />
            <h1 className="top-rated-books-title">{eachItem.title}</h1>
            <p className="top-rated-books-author">{eachItem.author_name}</p>
          </div>
        ))}
      </Slider>
    </div>
  )

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
    <div className="home-bg">
      <Navbar />
      <div className="home-details-div">
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <button type="button" onClick={findBooksButton} className="find-btn-sm">
          Find Books
        </button>
        {renderSwitchView()}
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
export default Home
