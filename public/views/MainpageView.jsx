/* global
  React
  NavbarView
  BodyView
*/

const MainpageView = (props) =>
  (<div>
    <NavbarView />
    <div>
      Please Enter Your Why You Need Help and the Language
      <br></br>
      <input></input><br></br>
      <button>Submit</button>
    </div>
  </div>
  );

window.MainpageView = MainpageView;
