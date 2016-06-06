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

// TODO
  // 1. Need to add ability to emit to server so that
  // 2. Ideally, the request form will have a title, description, person, create time

// TRY TO PRINT QUEUELISTARRAY DOWN THERE
  render() {
    return (
      <div>
        <NavbarView />
        <div>
          <div className='text-center'>
          <span>Latest Help Requests</span>
          </div>
          <br></br>
          <ul className="list-group">
            {this.state.list.map((helpRequest, key) =>
              (<li
                className="list-group-item clearfix subcontainer"
                key={key}
                onClick={() => {
                  this.props.sessionRoom.id = helpRequest.id;
                  socket.emit('removeFromQueue', { roomID: helpRequest.id });
                }}
              >
                <div className="pull-left col-sm-2">
                  <img src={helpRequest.userData.avatar || 'https://avatars2.githubusercontent.com/u/16586644?v=3&s=400'} alt={helpRequest.userData.username} class="img-thumbnail" height="100" width="100"></img>
                </div>
                <Link className="col-sm-10" to="/screenshare">
                  <div className="h2 bold">{helpRequest.text}</div>
                  <div>Requested By: {helpRequest.userData.displayName || 'Anonymous'}</div>
                  <div>Time: [5 minutes ago] </div>
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
