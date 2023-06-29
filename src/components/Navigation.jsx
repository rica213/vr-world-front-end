import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const isAdmin = useSelector(
    (state) => state.auth.user !== null && state.auth.user.admin === true,
  );
  const isOpen = useSelector((state) => state.nav.isOpen);

  const navStyle = {
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
        <img src="logos/app-logo.png" alt="app-logo" className="app-logo" />
      </div>
      <ul className="pages-link">
        <li>
          <Link to="/studios"><button type="button">STUDIOS</button></Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/reservations"><button type="button">RESERVATIONS</button></Link>
          </li>
        )}
        {isAdmin && (
          <>
            <li>
              <Link to="/studio/new"><button type="button">ADD STUDIOS</button></Link>
            </li>
            <li>
              <Link to="/studios/delete"><button type="button">DELETE STUDIOS</button></Link>
            </li>
          </>
        )}
      </ul>
      <section className="auth-wrapper">
        <ul className="auth-box">
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="auth-link"><button type="button">Log In</button></Link>
              </li>
              <li>
                <Link to="/signup" className="auth-link"><button type="button">Sign Up</button></Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <h5 className="username"><button type="button">Username</button></h5>
              <Link to="/logout" className="auth-link"><button type="button">Log Out</button></Link>
            </li>
          )}
        </ul>
      </section>
      <div className="social-box">
        <img src="/soc-icons/Social-Icons-black-horizontal.png" alt="social-bottom" className="social-bottom" />
      </div>
    </nav>
  );
};

export default Navigation;
