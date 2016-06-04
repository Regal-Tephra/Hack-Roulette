/* global
   React

*/
// class LandingPageView extends React.Component {

function LandingPageView(props) {
  console.log(props);
  return (
    <div className="login-button-wrapper">
      <div className="login-button" onClick={props.handleLogin}>Login Here</div>
    </div>
  );
}

window.LandingPageView = LandingPageView;
