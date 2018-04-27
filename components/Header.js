import Link from 'next/link';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn }) => (
  <div>
    <style jsx>{`
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
      }
      
      li {
          float: left;
      }
      
      li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
      }
      
      li a:hover {
          background-color: #111;
      }
    `}</style>
    <nav>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/public"><a>Public</a></Link></li>
        { isLoggedIn ? ( <li><Link href="/secret"><a>Secret</a></Link></li> ) : ( <li><Link href="/login"><a>Login</a></Link></li> ) }
        { isLoggedIn ? ( <li><Link href="/logout"><a>Logout</a></Link></li> ) : ( '' ) }
      </ul>
    </nav>
    <h1>Auth0 & Next.js</h1>
  </div>
)

Header.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default Header;