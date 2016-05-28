/* global
  React
  NavbarView
  BodyView
*/

const MainpageView = (props) =>
  (<div>
    <h1>MainPageView</h1>
    {props}
    <NavbarView />
  </div>
  );

window.MainpageView = MainpageView;
