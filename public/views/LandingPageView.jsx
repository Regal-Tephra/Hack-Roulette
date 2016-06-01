/* global
   React

*/
// class LandingPageView extends React.Component {

function LandingPageView() {
  const handleLogin = () => {
    window.location = 'auth/github';
  };
  return (
    <div className="login-button-wrapper">
      <div className="login-button" onClick={handleLogin}>Login Here</div>
    </div>
  );
}

window.LandingPageView = LandingPageView;
