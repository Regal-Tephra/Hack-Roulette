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
      showNone: { display: 'none' },
    };

    console.log('Helper userdata: ', this.props.userData);
    socket.on('connect', () => socket.emit('getCurrentQueueList'));
    socket.emit('getCurrentQueueList');
    socket.on('queueList', queueListArray => {
      console.log(queueListArray);
      if (queueListArray.length === 0) {
        this.setState({ list: queueListArray, showNone: { display: 'inline' } });
      } else {
        this.setState({ list: queueListArray, showNone: { display: 'none' } });
      }
    });
  }

// TRY TO PRINT QUEUELISTARRAY DOWN THERE
  render() {
    // If there are no items on the list, display a photo
    return (
      <div>
        <NavbarView />
        <div>
          <div className="text-center form-container">
            <h2>Latest Help Requests</h2>
          </div>
          <br></br>
          <div className="list-group">
            {this.state.list.map((helpRequest, key) =>
              (<div
                className="list-group-item clearfix subcontainer help-request-container"
                key={key}
                onClick={() => {
                  this.props.sessionRoom.id = helpRequest.id;
                  socket.emit('joinRoom', { userData: this.props.userData, helpInfo: helpRequest });
                  socket.emit('removeFromQueue', { roomID: helpRequest.id });
                }}
              >
                <div>
                  <img
                    src={helpRequest.userData.avatar || 'https://avatars2.githubusercontent.com/u/16586644?v=3&s=400'}
                    alt={helpRequest.userData.username}
                    className="img-thumbnail"
                  ></img>
                </div>
                <div className="help-request-details">
                  <Link to="/screenshare">
                    <div className="h2 bold no-margin">{helpRequest.text}</div>
                    <div className="help-request-detail-text">
                      <div>Requested By: {helpRequest.userData.displayName || 'Anonymous'}</div>
                      <div>Language: {helpRequest.languageChosen} </div>
                      <div>Time: [5 minutes ago] </div>
                    </div>
                  </Link>
                </div>
              </div>)
            )}
          </div>
        </div>
        <div className="text-center">
          <img
            src="../img/nohelpneeded.jpg"
            alt="No Help Needed"
            style={this.state.showNone}
          >
          </img>
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
