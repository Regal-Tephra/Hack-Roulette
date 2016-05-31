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

  // TODO: Build in navbar toggle
  render() {
    return (
      <div className="container">
        <div className="title">Hack Roulette</div>
        {this.pages[this.state.currentPage]}
      </div>
    );
  }
}

ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
