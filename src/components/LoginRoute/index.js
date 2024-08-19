import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showPassword: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value, errMsg: ''})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, errMsg: ''})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  submitLoginCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const loginDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 10})
      const {history} = this.props
      history.replace('/')
    }
    this.setState({errMsg: data.error_msg})
  }

  render() {
    const {username, password, showPassword, errMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <section className="loginSection">
        <div className="loginCard">
          <div className="logoCard">
            <img
              src="https://res.cloudinary.com/diw9caelj/image/upload/v1722960072/q_wrhx3h.svg"
              alt="login website logo"
            />
            <p className="logoTitle">NXT Quiz</p>
          </div>
          <form onSubmit={this.submitLoginCredentials}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username..."
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter Password..."
              onChange={this.onChangePassword}
              value={password}
            />
            <div className="showPassword">
              <input
                id="showPassword"
                type="checkbox"
                onChange={this.onShowPassword}
                checked={showPassword}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            {errMsg ? <p className="errMsg">{errMsg}</p> : ''}
            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>
        </div>
      </section>
    )
  }
}

export default LoginRoute
