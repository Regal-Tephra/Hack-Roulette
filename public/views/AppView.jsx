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
>>>>>>> When commited adds client side user logic
class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.handleMainSubmit = this.handleMainSubmit.bind(this);

    // State will control ScreenShareView's render
    this.state = {
      sessionData: {},
    };
<<<<<<< HEAD
  }

  handleMainSubmit(data) {
    // WE ARE GOOD HERE
    this.setState({ sessionData: data });
    this.forceUpdate();
  }

  render() {
    const ScreenShareViewWrap = () => {
      return (
        <ScreenShareView sessionData={this.state.sessionData} />
      );
    };
=======
    // ajax request to see if user is logged in
    // if not displayName/profileUrl/username will be undefiend
    $.ajax({
      url: '/loginCheck',
      type: 'GET',
      success: (data) => {
        const parsedData = JSON.parse(data);
        this.setState(
          {
            displayName: parsedData.displayName,
            profileUrl: parsedData.profileUrl,
            username: parsedData.username,
          }
        );
      },
    });
    // Currently Hardcoded
    this.userId = userIdOptions[Math.floor(Math.random() * userIdOptions.length)];
    // this.handleChange = this.handleChange.bind(this);
    // this.pages = {
    //   Landingpage: <LandingPageView />,
    //   Mainpage: <MainpageView userId={this.userId} />,
    //   Session: <ScreenShareView userId={this.userId} />,
    //   Feedback: <FeedbackView />,
    //   Helper: <HelperView />,
    // };
  }
  // {this.pages[this.state.currentPage]}
  // TODO: Build in navbar toggle
  render() {
    const context = this;
    const requireAuth = (nextState, replaceState) => {
      if (!context.state.username) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
      }
    };
    // pass user data in as a prop on 
    return (
      <div className="container">
        <div className="title">Hack Roulette</div>
        <Router>
          <Route path="/" component={MainpageView} onMainSubmit={this.handleMainSubmit} onEnter={requireAuth} />
          <Route path="/login" component={LandingPageView} />
          <Route path="/screenshare" component={ScreenShareViewWrap} sessionData={this.state.sessionData} onEnter={requireAuth} />
          <Route path="/feedback" component={FeedbackView} onEnter={requireAuth} />
          <Route path="/helper" component={HelperView} onEnter={requireAuth} />
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
