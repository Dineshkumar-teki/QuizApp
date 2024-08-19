import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {LuLogOut} from 'react-icons/lu'
import './index.css'

const Navbar = props => {
  const onLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt-token')
    return history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="weblogo">
          <img
            src="https://res.cloudinary.com/diw9caelj/image/upload/v1722960072/q_wrhx3h.svg"
            alt="website logo"
          />
          <p className="logoname">NXT Quiz</p>
        </div>
      </Link>
      <button type="button" onClick={onLogoutBtn}>
        Logout
      </button>
      <LuLogOut className="logoutBtnIcon" onClick={onLogoutBtn} />
    </nav>
  )
}
export default withRouter(Navbar)
