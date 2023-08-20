import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import './index.css'
import {IoMdMenu, IoMdClose} from 'react-icons/io'
import Cookies from 'js-cookie'

const Navbar = props => {
  const [menuActive, setMenuActive] = useState(false)

  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const hamburgerMenu = () => {
    setMenuActive(!menuActive)
  }

  const closeMenu = () => {
    setMenuActive(!menuActive)
  }

  const renderSmallView = () => (
    <nav className="navbar-sm">
      <div className="nav-menu-div-sm">
        <Link to="/" className="nav-logo-sm">
          <img
            src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1691995299/books_hub_logo_i8xggp.png"
            alt="website logo"
          />
        </Link>
        {!menuActive && <IoMdMenu size="20" onClick={hamburgerMenu} />}
        {menuActive && <IoMdClose size="20" onClick={closeMenu} />}
      </div>
      {menuActive && (
        <ul className="nav-ul-sm">
          <Link to="/" className="nav-link-btn">
            <li>Home</li>
          </Link>
          <Link to="/shelf" className="nav-link-btn">
            <li>Bookshelves</li>
          </Link>
          <button
            type="button"
            className="logout-btn-sm"
            onClick={logoutButton}
          >
            Logout
          </button>
        </ul>
      )}
    </nav>
  )

  return (
    <>
      <nav className="navbar-bg">
        <Link to="/" className="nav-logo-bg">
          <img
            src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1691995299/books_hub_logo_i8xggp.png"
            alt="website logo"
          />
        </Link>

        <ul className="nav-ul">
          <Link to="/" className="nav-link-btn">
            <li>Home</li>
          </Link>
          <Link to="/shelf" className="nav-link-btn">
            <li>Bookshelves</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={logoutButton}>
          Logout
        </button>
      </nav>
      {renderSmallView()}
    </>
  )
}
export default withRouter(Navbar)
