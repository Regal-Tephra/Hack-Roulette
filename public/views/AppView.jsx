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
    this.requireAuth = this.requireAuth.bind(this);

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
    };
  }

  handleMainSubmit(data) {
    // WE ARE GOOD HERE
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

  requireAuth(nextState, replaceState) {
   // use this to block routes if not logged in
   // may have to add state to login page.
  }
  // {this.pages[this.state.currentPage]}
  // TODO: Build in navbar toggle
  render() {
    // pass user data in as a prop on
    return (
      <div className="container">
        <div className="title">Hack Roulette</div>
        <Router>
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
            path="/login" component={this.views.landingpage} />
          <Route
            onEnter={this.requireAuth}
            path="/feedback" component={this.views.feedback}
          />
          <Route
            onEnter={this.requireAuth}
            path="/helper" component={this.views.helper}
          />
        </Router>
        <footer className="footer container-fluid text-center">
          <p className="col-lg-8">{"Made with <3"}</p>
        </footer>
      </div>
    );
  }
}

// ScreenShareView Wrapper to Include PROPS


ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
