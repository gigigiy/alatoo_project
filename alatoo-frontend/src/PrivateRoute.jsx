// import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('access'); // Use access token
  return token ? element : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
