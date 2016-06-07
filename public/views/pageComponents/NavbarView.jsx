/* global
  React
  ReactRouter
*/

const Link = ReactRouter.Link;

// Note: props.videoHandler ends a video session if one is running when clicked
const NavbarView = (props) => (
  <nav className="navbar navbar-default light-themed-background">
    <img src="../img/hack-roulette-logo-1.png" className="logo" />
    <div className="navbar-buttons">
      <button className="btn btn-default navbar-btn pull-right" onClick={props.videoHandler}>
        <Link to="/login">
          Log Out
        </Link>
      </button>

      <button className="btn btn-default navbar-btn pull-right" onClick={props.videoHandler}>
        <Link to="/profile">
          Your Profile
        </Link>
      </button>

      <button className="btn btn-default navbar-btn pull-right" onClick={props.videoHandler}>
        <Link to="/helper">
          Become a Helper
        </Link>
      </button>

      <button className="btn btn-default navbar-btn pull-right" onClick={props.videoHandler}>
        <Link to="/">
          Make Request
        </Link>
      </button>

    </div>
  </nav>
);
NavbarView.propTypes = {
  videoHandler: React.PropTypes.object.isRequired,
};

window.NavbarView = NavbarView;
