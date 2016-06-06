/* global
  React
  NavbarView
  BodyView
  ReactRouter
  MainpageForm
  io
*/

  // TODO: Need to show loading page
  // PSEUDOCODE:
    // Step 1: Emit to Server and Show Loading View
    // Step 2: Wait for response from server (callback/promise)
    // Step 3: Turn off loading view and redirect when data is received

class MainpageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueStatus: false,
      userData: this.props.userData,
    };
  }

  render() {
    return (
      <div>
        <NavbarView />
        <div className="text-center col-md-6 col-md-offset-3 form-container">
          <div className="text-center"><h2>Get Help Now</h2></div>
          <br></br>
          <MainpageForm
            userData={this.props.userData}
            sessionRoom={this.props.sessionRoom}
          />
        </div>
      </div>
    );
  }
}

// col-md-offset-6

MainpageView.propTypes = {
  userData: React.PropTypes.object.isRequired,
  sessionRoom: React.PropTypes.object.isRequired,
};

window.MainpageView = MainpageView;
