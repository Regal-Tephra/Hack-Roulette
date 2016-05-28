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

const socket = io();
class AppView extends React.Component {
  constructor(props) {
    super(props);

    // Currently Hardcoded
    this.userID = 'Sally';

    this.pages = {
      Landingpage: <LandingPageView />,
      Mainpage: <MainpageView />,
      Session: <ScreenShareView userId={this.userId} />,
      Feedback: <FeedbackView />,
    };

    this.state = {
      value: 'hello',
      currentPage: 'Mainpage',
      navBarToggle: false,
    };

    socket.on('text change', (text) => {
      this.setState({ value: text });
    }).bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    socket.emit('change', this.state.value);
  }

  // TODO: Build in navbar toggle
  render() {
    return (
      <div>
        <h1>App Component</h1>
        {this.pages[this.state.currentpage]}
        <input
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}


ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
