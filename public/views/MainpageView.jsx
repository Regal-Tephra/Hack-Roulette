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
    <div>
      Please Enter Your Why You Need Help and the Language
      <br></br>
      <input></input><br></br>
      <button><Link to="/screenshare">Submit</Link></button>
    </div>
  </div>
  );

window.MainpageView = MainpageView;
