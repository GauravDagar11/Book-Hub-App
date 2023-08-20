import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const changeUsername = event => {
    setUserData({...userData, username: event.target.value})
  }

  const changePassword = event => {
    setUserData({...userData, password: event.target.value})
  }

  useEffect(() => {
    if (Cookies.get('jwt_token') !== undefined) {
      const {history} = props
      history.replace('/')
    }
  }, [])

  const success = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    const {history} = props
    history.replace('/')
  }

  const failure = error => {
    setErrorMsg(error)
  }

  const uploadData = async () => {
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      success(data.jwt_token)
    } else {
      failure(data.error_msg)
    }
  }

  const formEl = event => {
    event.preventDefault()
    uploadData()
  }

  return (
    <div className="login-bg">
      <img
        src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1691994153/login_page_u9opd1.png"
        alt="website login"
        className="login-book-image"
      />
      <img
        src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1692427499/book-img-sm_nlt6x2.png"
        alt="website logo"
        className="login-book-image-sm"
      />
      <img
        src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1691995299/books_hub_logo_i8xggp.png"
        alt="login website logo"
        className="login-logo-sm"
      />
      <div className="form-div">
        <form className="form" onSubmit={formEl}>
          <img
            src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1691995299/books_hub_logo_i8xggp.png"
            alt="login website logo"
            className="login-logo"
          />
          <label htmlFor="username" className="label">
            Username*
          </label>
          <input
            type="text"
            placeholder="USERNAME"
            id="username"
            className="input"
            onChange={changeUsername}
          />
          <label htmlFor="password" className="label">
            Password*
          </label>
          <input
            type="password"
            placeholder="PASSWORD"
            id="password"
            className="input"
            onChange={changePassword}
          />
          <p className="error-msg">{errorMsg}</p>
          <button
            type="submit"
            className="login-btn"
            disabled={userData.username === '' || userData.password === ''}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
