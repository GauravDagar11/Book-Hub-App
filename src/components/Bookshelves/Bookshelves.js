import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Navbar from '../Navbar/Navbar'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Bookshelves = () => {
  const [activeBtn, setActiveBtn] = useState({
    value: bookshelvesList[0].value,
    heading: bookshelvesList[0].label,
  })
  const [search, setSearch] = useState('')
  const [api, setApi] = useState(apiStatusConstants.initial)
  const [booksData, setData] = useState([])

  const fetchData = async () => {
    setApi(apiStatusConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeBtn.value}&search=${search}`
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
      setData(data.books)
    } else {
      setApi(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeBtn])

  const categoryButton = details => {
    setActiveBtn(details)
    console.log(details)
  }

  const searchBar = event => {
    setSearch(event.target.value)
  }

  const searchButton = () => {
    fetchData()
  }

  const tryAgainButton = () => {
    fetchData()
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    let output
    if (booksData.length === 0) {
      output = (
        <div className="no-search-div">
          <img
            src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1692171746/no-search_omoifm.png"
            alt="no books"
            className="no-search-img"
          />
          <p>{`Your search for ${search} did not find any matches.`}</p>
        </div>
      )
    } else {
      output = (
        <ul className="bookshelves-books-ul">
          {booksData.map(eachItem => (
            <Link
              to={`/books/${eachItem.id}`}
              className="link"
              key={eachItem.id}
            >
              <li className="books-list" key={eachItem.id}>
                <img
                  src={eachItem.cover_pic}
                  alt={eachItem.title}
                  className="book-img"
                />
                <div className="book-details-container">
                  <h1 className="book-title">{eachItem.title}</h1>
                  <p className="book-author-name">{eachItem.author_name}</p>
                  <div className="rating-div">
                    <p className="avg-rating">Avg Rating</p>
                    <BsFillStarFill size="15" color="#FBBF24" />
                    <p className="book-rating">{eachItem.rating}</p>
                  </div>

                  <p className="book-status">
                    Status:
                    <span className="read-status"> {eachItem.read_status}</span>
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )
    }
    return <div>{output}</div>
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
      <div className="bookshelves-bg">
        <div className="category-div">
          <h1 className="bookshelves-heading">Bookshelves</h1>
          <ul className="category-ul-div">
            {bookshelvesList.map(eachItem => (
              <li className="li">
                <button
                  type="button"
                  className={
                    eachItem.value === activeBtn.value
                      ? 'active-category-btn'
                      : 'category-btn'
                  }
                  onClick={() =>
                    categoryButton({
                      value: eachItem.value,
                      heading: eachItem.label,
                    })
                  }
                >
                  {eachItem.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bookshelves-books-div">
          <div className="heading-search-bar">
            <h1 className="all-books-heading">{`${activeBtn.heading} Books`}</h1>
            <div className="search-bar-div">
              <input
                type="search"
                value={search}
                className="search-input"
                placeholder="Search"
                onChange={searchBar}
              />
              <button
                type="button"
                className="icon-btn"
                onClick={searchButton}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          <h1 className="bookshelves-heading-sm">Bookshelves</h1>
          <ul className="category-btn-sm-div">
            {bookshelvesList.map(eachItem => (
              <li
                className={
                  eachItem.value === activeBtn.value
                    ? 'active-category-btn-sm-li'
                    : 'category-btn-sm-li'
                }
                onClick={() =>
                  categoryButton({
                    value: eachItem.value,
                    heading: eachItem.label,
                  })
                }
              >
                {eachItem.label}
              </li>
            ))}
          </ul>
          {renderSwitchView()}
          <div className="icons-div">
            <FaGoogle className="icon" />
            <FaTwitter className="icon" />
            <FaInstagram className="icon" />
            <FaYoutube className="icon" />
            <p>Contact Us</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookshelves
