/* global
  LoggedinView
  FeedbackView
  MainpageView
  HelperView
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

    // State will control ScreenShareView's render
    this.state = {
      sessionData: {},
      userData: {},
      sessionRoom: { id: 5 },
    };
    this.checkLogin();
    this.views = {
      screenshare: () =>
        <ScreenShareView
          sessionData={this.state.sessionData}
          userData={this.state.userData}
          room={this.state.sessionRoom.id}
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
    // pass user data in as a prop on
    // <div className="title">Hack Roulette</div>
    return (
      <div className="container" id="appContainer">
        <Router>
<<<<<<< 12cb11f5543d624fdb231bf2b88ee35cecb05db0
          <Route path="/" component={this.views.mainpage} />
          <Route path="/screenshare" component={this.views.screenshare} />
          <Route path="/login" component={this.views.landingpage} />
          <Route path="/feedback" component={this.views.feedback} />
          <Route path="/helper" component={this.views.helper} />
=======
          <Route
            onEnter={this.requireAuth}
            path="/" component={this.views.mainpage}
          />
          <Route
            onEnter={this.requireAuth}
            path="/screenshare" component={this.views.screenshare}
          />
          <Route
            onEnter={this.requireAuth}
            path="/login" component={this.views.landingpage}
          />
          <Route
            onEnter={this.requireAuth}
            path="/feedback" component={this.views.feedback}
          />
          <Route
            onEnter={this.requireAuth}
            path="/helper" component={this.views.helper}
          />
          <Route
            onEnter={this.requireAuth}
            path="/profile" component={this.views.profile}
          />
>>>>>>> did some progress on profile view
        </Router>

      </div>
    );
  }
}


ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
