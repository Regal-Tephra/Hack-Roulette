/* global
   React

*/
// class LandingPageView extends React.Component {

// Landing Page
  // Add background photo
  // Add some copy / upperText
  // Make the signup button a green button


function LandingPageView(props) {
  console.log(props);
  return (
    <div>
      <div className="container loginContainer vertical-center" id="backgroundDiv">
        <div className="col-md-4 col-md-offset-1" id="leftContainer">
          <div className="h1" id="upperText">Get help on your coding problems now</div>
          <div className="h3" id="middleText">Sign up now and get paired with a trusted mentor to guide you through your most pressing challenges</div>
          <br />
          <div className="btn btn-success" id="loginButton" onClick={props.handleLogin}>Login Here</div>
        </div>
      </div>
    </div>
  );
}

window.LandingPageView = LandingPageView;
