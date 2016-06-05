/* global
  React
  NavbarView
  BodyView
  ReactRouter
  io
*/

// const Link = ReactRouter.Link;

// TODOS:
  // Show Loading Page after CLIENT1 presses "Submit button"
  // Send over Client1 userID information
  // When the server finishes loading or finds a match, send to
    // the screenshare page


const socket = io('/help-requests');
class MainpageView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loaded: false,
      queueStatus: false,
      requestText: '',
      userData: this.props.userData,
    };
    console.log('Mainpage userdata: ', this.props.userData);
    this.updateRequestText = this.updateRequestText.bind(this);
    this.sendRequestText = this.sendRequestText.bind(this);
  }

  // TODO: Need to show loading page
  // PSEUDOCODE:
    // Step 1: Emit to Server and Show Loading View
    // Step 2: Wait for response from server (callback/promise)
    // Step 3: Turn off loading view and redirect when data is received
  sendRequestText(e) {
    e.preventDefault();

    const messageSent = {
      client1sessionID: socket.io.engine.id,
      requestText: this.state.requestText,
    };

    // Emit to Server and Show Loading View
    console.log('Emitting', this.state.requestText);
    document.getElementById('text').value = '';
    this.setState({ requestText: '', loaded: true });
    socket.emit('queued', messageSent, data => {
      // this.setState({ loaded: false });
      this.props.sessionRoom.id = data.id;
      // this.props.route.onMainSubmit(data);
      window.location = '#/screenshare';
    });
  }

  updateRequestText(e) {
    this.setState({ requestText: e.target.value });
  }

  render() {
    const loading = this.state.loaded ?
      <div>We are matching you with somebody!</div> :
      <div></div>;

    return (
      <div>
        <NavbarView />
        <form>
          <div className="text-center" >
            Please Enter Your Why You Need Help and the Language
            <br></br>
            <textarea
              id="text"
              className="col-lg"
              placeholder="e.g. looking for help with n-queens!"
              rows="4"
              cols="49"
              onChange={this.updateRequestText}
            ></textarea><br></br>
            <input type="submit" onClick={this.sendRequestText} value="Get Help Now!" />
          </div>
        </form>
        {loading}
      </div>
  );
  }
}

MainpageView.propTypes = {
  // route: React.PropTypes.object.isRequired,
  // history: React.PropTypes.object.isRequired,
  userData: React.PropTypes.object.isRequired,
  sessionRoom: React.PropTypes.object.isRequired,
};

window.MainpageView = MainpageView;
