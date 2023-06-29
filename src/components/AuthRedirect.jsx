import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRedirect = (AuthComponent) => {
  const AuthRedirectComponent = (props) => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.token !== null);

    useEffect(() => {
      if (isLoggedIn) {
        navigate("/home");
      }
    }, [isLoggedIn, navigate]);
  };

  return <AuthComponent {...props} />;
};

export default AuthRedirect;
