/* global
  React
  NavbarView
  BodyView
  ReactRouter
  io
*/

const Link = ReactRouter.Link;

const socket = io('/help-requests');
class HelperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      list: [],
      userData: this.props.userData,
    };
    console.log('Helper userdata: ', this.props.userData);
    socket.on('connect', () => socket.emit('getCurrentQueueList'));
    socket.emit('getCurrentQueueList');
    socket.on('queueList', queueListArray => {
      console.log(queueListArray);
      this.setState({ list: queueListArray });
    });
  }

// JOIN HELP REQUEST ROOM
  // STEP 1: Click interested Room
  // STEP 2: Wait for data about new room
  // STEP 3: REDIRECT TO ROOM

// TRY TO PRINT QUEUELISTARRAY DOWN THERE
  render() {
    return (
      <div>
        <NavbarView />
        <div className="text-center">
          You are helping!!
          <br></br>
          <ul className="list">
            {this.state.list.map((helpRequest, key) =>
              (<li
                key={key}
                onClick={() => (this.props.sessionRoom.id = helpRequest.id)}
               >
                <img src={helpRequest.userData.avatar} alt={helpRequest.userData.username} class="img-thumbnail" height="100" width="100"></img>
                <Link to="/screenshare">
                  {helpRequest.userData.displayName || 'Anonymous'}: {helpRequest.text}
                </Link>
              </li>)
            )}
          </ul>
        </div>
      </div>
  );
  }
}

HelperView.propTypes = {
  userData: React.PropTypes.object.isRequired,
  sessionRoom: React.PropTypes.object.isRequired,
};

window.HelperView = HelperView;
