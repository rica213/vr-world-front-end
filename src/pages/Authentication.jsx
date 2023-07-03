import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleUpdate,
  logInUser,
  registerUser,
  toggleFormAuth,
} from '../redux/features/AuthenticationSlice';
import AuthRedirect from '../components/AuthRedirect';
import '../styles/Authentication.css';

const Authentication = () => {
  const dispatch = useDispatch();

  const {
    tempUser: {
      username, email, password, confirmPassword,
    },
  } = useSelector((state) => state.auth);

  const formAuth = useSelector((state) => state.auth.formAuth);

  const handleLogIn = () => {
    dispatch(
      logInUser({
        user: {
          email,
          password,
        },
      }),
    );
  };

  const handleRegister = () => {
    dispatch(
      registerUser({
        user: {
          username,
          email,
          password,
        },
      }),
    );
    dispatch(toggleFormAuth());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleUpdate({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formAuth === 'login') {
      handleLogIn(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <main className="auth-main">
      <form onSubmit={(e) => handleSubmit(e)} className="form-wrapper">
        <h1 className="auth-title">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </h1>
        {formAuth === 'register' && (
          <div className="field">
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        )}
        <div className="field">
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {formAuth === 'register' && (
          <div className="field">
            <input
              type="password"
              placeholder="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-btn">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </button>
        {formAuth === 'login' ? (
          <>
            <p>Don&apos;t have an account?</p>
            <button
              type="button"
              onClick={() => dispatch(toggleFormAuth())}
              className="switch-auth"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => dispatch(toggleFormAuth())}
              className="switch-auth"
            >
              Log In
            </button>
          </>
        )}
      </form>
    </main>
  );
};

export default AuthRedirect(Authentication);
