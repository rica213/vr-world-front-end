import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import {
  logOutUser,
  toLogin,
  toRegister,
} from '../redux/features/AuthenticationSlice';
import { toggleNav } from '../redux/features/NavbarSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const isAdmin = useSelector(
    (state) => state.auth.user !== null && state.auth.user.admin === true,
  );
  const username = useSelector(
    (state) => state.auth.user !== null && state.auth.user.username,
  );
  const isOpen = useSelector((state) => state.nav.isOpen);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOutUser());
    navigate('/');
  };
  const handleHideNav = () => {
    dispatch(toggleNav());
  };

  const navStyle = {
    zIndex: '95',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'grid',
    gridTemplateRows: '1fr 3.5fr 1fr',
    width: '36vw',
    height: '100vh',
    transform: isOpen ? 'none' : 'translateX(-37vw)',
    backgroundColor: 'white',
    borderRight: 'rgb(240, 240, 240) solid 1px',
    transition: 'all 1s',
  };

  return (
    <nav style={navStyle}>
      <div className="logo-box">
        <img src="/logos/app-logo.png" alt="app-logo" className="app-logo" />
      </div>
      <ul className="pages-link">
        <li>
          <Link to="/home">
            <button type="button" onClick={() => handleHideNav()}>
              STUDIOS
            </button>
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/reservations/my-reservations">
              <button type="button" onClick={() => handleHideNav()}>
                RESERVATIONS
              </button>
            </Link>
          </li>
        )}
        {isAdmin && (
          <>
            <li>
              <Link to="/studio/new">
                <button type="button" onClick={() => handleHideNav()}>
                  ADD STUDIOS
                </button>
              </Link>
            </li>
            <li>
              <Link to="/studio">
                <button type="button" onClick={() => handleHideNav()}>
                  DELETE STUDIOS
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>

      <section className="auth-wrapper">
        <ul className="auth-box">
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/auth" className="auth-link">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(toLogin());
                      handleHideNav();
                    }}
                  >
                    Log In
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/auth" className="auth-link">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(toRegister());
                      handleHideNav();
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <h5 className="username">{username}</h5>
              <button
                type="button"
                className="down-btn"
                onClick={() => {
                  handleLogout();
                  handleHideNav();
                }}
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      </section>

      <div className="social-box">
        <img
          src="/soc-icons/Social-Icons-black-horizontal.png"
          alt="social-bottom"
          className="social-bottom"
        />
      </div>
    </nav>
  );
};

export default Navigation;
