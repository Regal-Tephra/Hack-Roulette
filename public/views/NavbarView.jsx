/* global
  React
  ReactRouter
*/

const Link = ReactRouter.Link;

const NavbarView = (props) => {
  return (
    <nav className="navbar navbar-default">
      <p className="navbar-text">Hack Roulette</p>
      <button className="btn btn-default navbar-btn pull-right">
        <Link to="/login">Log Out
        </Link>
      </button>
    </nav>
  );
};


window.NavbarView = NavbarView;
