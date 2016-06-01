/* global
  LoggedinView
  FeedbackView
  MainpageView
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

const userIdOptions = ['Greg', 'Thomas', 'Andy', 'Erika', 'Selena', 'Josh', 'William', 'Brittany'];
class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Landingpage',
      navBarToggle: false,
    };

    // Currently Hardcoded
    this.userId = userIdOptions[Math.floor(Math.random() * userIdOptions.length)];
    // this.handleChange = this.handleChange.bind(this);

    this.pages = {
      Landingpage: <LandingPageView />,
      Mainpage: <MainpageView />,
      Session: <ScreenShareView userId={this.userId} />,
      Feedback: <FeedbackView />,
    };
  }

  // {this.pages[this.state.currentPage]}
  // TODO: Build in navbar toggle
  render() {
    return (
      <div className="container">
        <div className="title">Hack Roulette</div>
        <Router>
          <Route path="/" component={MainpageView} />
          <Route path="/login" component={LandingPageView} />
          <Route path="/AddUser" component={MainpageView} />
          <Route path="/screenshare" component={ScreenShareView} />
          <Route path="/feedback" component={FeedbackView} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
