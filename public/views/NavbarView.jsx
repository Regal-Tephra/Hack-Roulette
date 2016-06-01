/* global
  React
  ReactRouter
*/

const Link = ReactRouter.Link;

const NavbarView = (props) => {
  // Logout should redirect

  const navBartext = 'NavBar ------------------------------------------';
  return (
    <div>
      {navBartext}
      <button><Link to="/login">Log Out</Link></button>
    </div>
  );
};


window.NavbarView = NavbarView;
