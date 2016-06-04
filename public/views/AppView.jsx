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
*/

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
<<<<<<< HEAD
=======
const userIdOptions = ['Greg', 'Thomas', 'Andy', 'Erika', 'Selena', 'Josh', 'William', 'Brittany'];
>>>>>>> d67366e1b2e656f3d91293af050e40af0fb22b9e
class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.handleMainSubmit = this.handleMainSubmit.bind(this);
    this.requireAuth = this.requireAuth.bind(this);

    // State will control ScreenShareView's render
    this.state = {
      sessionData: {},
      userData: {},
    };
    this.checkLogin();
  }

<<<<<<< HEAD
  handleMainSubmit(data) {
    // WE ARE GOOD HERE
    this.setState({ sessionData: data });
    this.forceUpdate();
  }

=======
>>>>>>> d67366e1b2e656f3d91293af050e40af0fb22b9e
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

  handleMainSubmit(data) {
    // WE ARE GOOD HERE
    this.setState({ sessionData: data });
    this.forceUpdate();
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
    const ScreenShareViewWrap = () => {
      return (
        <ScreenShareView sessionData={this.state.sessionData} userData={this.state.userData} />
      );
    };
    const HelperViewWrap = () => {
      return (
        <HelperView sessionData={this.state.sessionData} userData={this.state.userData} />
      );
    };
    const MainpageViewWrap = () => {
      return (
        <MainpageView sessionData={this.state.sessionData} userData={this.state.userData} />
      );
    };
    const FeedbackViewWrap = () => {
      return (
        <FeedbackView sessionData={this.state.sessionData} userData={this.state.userData} />
      );
    };
    const LandingPageViewWrap = () => {
      return (
        <LandingPageView sessionData={this.state.sessionData} userData={this.state.userData} handleLogin={this.handleLogin} />
      );
    };
    // pass user data in as a prop on
    return (
      <div className="container">
        <div className="title">Hack Roulette</div>
        <Router>
          <Route path="/" component={MainpageViewWrap} onMainSubmit={this.handleMainSubmit} onEnter={this.requireAuth} />
          <Route path="/login" component={LandingPageViewWrap} />
          <Route path="/screenshare" component={ScreenShareViewWrap} onEnter={this.requireAuth} />
          <Route path="/feedback" component={FeedbackViewWrap} onEnter={this.requireAuth} />
          <Route path="/helper" component={HelperViewWrap} onEnter={this.requireAuth} />
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
