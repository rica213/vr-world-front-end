import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleUpdate,
  logInUser,
  registerUser,
  toggleFormAuth,
} from '../redux/features/AuthenticationSlice';
import AuthRedirect from '../components/AuthRedirect';

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>{formAuth === 'login' ? 'Log In' : 'Register'}</h1>
      {formAuth === 'register' && (
        <div className="field">
          <label htmlFor="username">
            {' '}
            Username
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
      )}
      <div className="field">
        <label htmlFor="email">
          {' '}
          Email
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
        </label>
      </div>
      <div className="field">
        <label htmlFor="password">
          {' '}
          Password
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
        </label>
      </div>
      {formAuth === 'register' && (
        <div className="field">
          <label htmlFor="confirmPassword">
            {' '}
            Confirm Password
            <input
              type="password"
              placeholder="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
      )}
      <button type="submit">
        {formAuth === 'login' ? 'Log In' : 'Register'}
      </button>
      {formAuth === 'login' ? (
        <button type="button" onClick={() => dispatch(toggleFormAuth())}>
          Register
        </button>
      ) : (
        <button type="button" onClick={() => dispatch(toggleFormAuth())}>
          Log In
        </button>
      )}
    </form>
  );
};

export default AuthRedirect(Authentication);
