import PropTypes from 'prop-types';
import { getToken } from '../static/auth.js';
import template from '../static/template';

const Index = ({ isLoggedIn }) => (
  <div>
    Hello, this is the main application.
    { !isLoggedIn && (
      <p>You're not logged in yet</p>
    )}
  </div>
);

Index.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default template(Index);