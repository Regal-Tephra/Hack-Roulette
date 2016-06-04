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

class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.handleMainSubmit = this.handleMainSubmit.bind(this);

    // State will control ScreenShareView's render
    this.state = {
      sessionData: {},
    };
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
    return (
      <div className="container">
        <div className="title">Hack Roulette</div>
        <Router>
          <Route path="/" component={MainpageView} onMainSubmit={this.handleMainSubmit} />
          <Route path="/login" component={LandingPageView} />
          <Route path="/screenshare" component={ScreenShareViewWrap} />
          <Route path="/feedback" component={FeedbackView} />
          <Route path="/helper" component={HelperView} />
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
