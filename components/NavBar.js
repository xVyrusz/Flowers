/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

const NavBar = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const isActive = (path) => {
    if (path === router.pathname) {
      return "active"
    } else {
      return ""
    }
  }

  const handleLogout = () => {
    Cookie.remove('refreshToken', {path: 'api/auth/accessToken'});
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} });
  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <img src={auth.user.avatar} alt={auth.user.avatar} style={{
            borderRadius: '50%', width: '30px', height: '30px', transform: 'translateY(-3px)', marginRight: '3px'
          }} />
          {auth.user.name}
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Profile</a>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </div>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Tienda Flores</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-md-auto">
            <li className="nav-item">
              <Link href="/cart">
                <a className={"nav-link " + isActive('/cart')} ><i className="fa-solid fa-cart-shopping"></i> Cart</a>
              </Link>
            </li>
            {
              Object.keys(auth).length === 0
                ? <li className="nav-item">
                  <Link href="/signin">
                    <a className={"nav-link " + isActive('/signin')}><i className="fa-solid fa-user"></i> Sign in</a>
                  </Link>
                </li>
                : loggedRouter()
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar