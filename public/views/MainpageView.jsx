/* global
  React
  NavbarView
  BodyView
  ReactRouter
*/

const Link = ReactRouter.Link;

const MainpageView = (props) =>
  (<div>
    <NavbarView />
    <div className="text-center" >
      Please Enter Your Why You Need Help and the Language
      <br></br>
      <input className="col-lg-offset-4" placeholder="e.g. get help including end queens!">
      </input><br></br>
      <button><Link to="/screenshare">Get Help Now!</Link></button>
    </div>
  </div>
  );

window.MainpageView = MainpageView;
