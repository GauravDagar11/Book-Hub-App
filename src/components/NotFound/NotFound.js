import './index.css'

const NotFound = props => {
  const backButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-bg">
      <img
        src="https://res.cloudinary.com/dxjidaqmu/image/upload/v1692359447/not-found_fgva4e.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found, <br />
        Please go back to the homepage.
      </p>
      <button type="button" className="go-back-btn" onClick={backButton}>
        Go Back to Home
      </button>
    </div>
  )
}

export default NotFound
