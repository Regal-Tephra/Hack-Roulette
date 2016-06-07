/* global
  LoggedinView
  FeedbackView
  MainpageView
  HelperView
  ProfileView
  React
  NavbarView
  ScreenShareView
  LandingPageView
  ReactDOM
  io
  ReactRouter
  Router
  Route
  $
*/

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.handleMainSubmit = this.handleMainSubmit.bind(this);
    this.handleScreenSharePeerData = this.handleScreenSharePeerData.bind(this);

    // State will control ScreenShareView's render
    this.state = {
      sessionData: {},
      userData: {},
      peerData: {},
      sessionRoom: { id: 5 },
    };
    this.checkLogin();
    this.views = {
      screenshare: () =>
        <ScreenShareView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
          room={this.state.sessionRoom.id}
          handleScreenSharePeerData={this.handleScreenSharePeerData}
        />,
      helper: () =>
        <HelperView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
          sessionRoom={this.state.sessionRoom}
        />,
      mainpage: () =>
        <MainpageView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
          onMainSubmit={this.handleMainSubmit}
          sessionRoom={this.state.sessionRoom}
        />,
      feedback: () =>
        <FeedbackView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
        />,
      landingpage: () =>
        <LandingPageView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
          handleLogin={this.handleLogin}
        />,
      profile: () =>
        <ProfileView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
          handleLogin={this.handleLogin}
        />,
    };
  }

  handleMainSubmit(data) {
    this.setState({ sessionData: data });
    this.forceUpdate();
  }

  handleScreenSharePeerData(peerData) {
    this.setState({ peerData: peerData });
    console.log("Peer Data has been updated in AppView!", this.state.peerData);
    this.forceUpdate();
  }

  checkLogin() {
    $.ajax({
      url: '/loginCheck',
      type: 'GET',
      success: (data) => {
        const parsedData = JSON.parse(data);
        this.setState(
          {
            userData: {
              displayName: parsedData.displayName,
              profileUrl: parsedData.profileUrl,
              username: parsedData.username,
              avatar: parsedData._json.avatar_url,
              githubID: parsedData.id,
            },
          }
        );
        this.forceUpdate();
      },
    });
  }

  handleLogin() {
    window.location = 'auth/github';
  }


  render() {
    return (
      <div className="container" id="appContainer">
        <Router>
          <Route path="/" component={this.views.mainpage} />
          <Route path="/screenshare" component={this.views.screenshare} />
          <Route path="/login" component={this.views.landingpage} />
          <Route path="/feedback" component={this.views.feedback} />
          <Route path="/helper" component={this.views.helper} />
          <Route path="/profile" component={this.views.profile} />
        </Router>
      </div>
    );
  }
}


ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
