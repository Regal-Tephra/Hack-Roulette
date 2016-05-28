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
*/
class AppView extends React.Component {
  constructor(props) {
    super(props);

    // Currently Hardcoded
    this.userID = 'Sally';
    // this.handleChange = this.handleChange.bind(this);

    this.pages = {
      Landingpage: <LandingPageView />,
      Mainpage: <MainpageView />,
      Session: <ScreenShareView userId={this.userId} />,
      Feedback: <FeedbackView />,
    };

    this.state = {
      currentPage: 'Mainpage',
      navBarToggle: false,
    };
  }

  // TODO: Build in navbar toggle
  render() {
    return (
      <div>
        <h1>Hack Roulette</h1>
        {this.pages[this.state.currentPage]}
      </div>
    );
  }
}


ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
