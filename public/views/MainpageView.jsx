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

  // TODO: Need to show loading page
  // PSEUDOCODE:
    // Step 1: Emit to Server and Show Loading View
    // Step 2: Wait for response from server (callback/promise)
    // Step 3: Turn off loading view and redirect when data is received

const socket = io('/help-requests');
class MainpageView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      queueStatus: false,
      requestText: '',
      userData: this.props.userData,
    };
    console.log('Mainpage userdata: ', this.props.userData);
    this.updateRequestText = this.updateRequestText.bind(this);
    this.sendRequestText = this.sendRequestText.bind(this);
  }

  sendRequestText(e) {
    // Send request to server
    console.log('Sending request', this.state.requestText);
    e.preventDefault();
    document.getElementById('text').value = '';
    this.setState({ requestText: '' });
    socket.emit('addRequest', { requestText: this.state.requestText },
      data => {
        // set roomId and switch to screenshare view
        console.log('Server responded', data);
        this.props.sessionRoom.id = data.id;
        window.location = '#/screenshare';
      });
  }
  updateRequestText(e) {
    // update state based on textbox change
    this.setState({ requestText: e.target.value });
  }

  render() {
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
      </div>
    );
  }
}

MainpageView.propTypes = {
  userData: React.PropTypes.object.isRequired,
  sessionRoom: React.PropTypes.object.isRequired,
};

window.MainpageView = MainpageView;
