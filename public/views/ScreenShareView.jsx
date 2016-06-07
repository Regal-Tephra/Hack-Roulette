/* global
   React
   _
   ReactRouter
   NavbarView
   Icecomm
   localVideo
   io
   */

// Need to remove API Key
const comm = new Icecomm('WLowOG2uYovkPa4dSAuyEdBhKVlUFSFZFjp8bMmG0wSeeLLVzO');
const Link = ReactRouter.Link;
const socket = io('/screenshare');
const socketHelperQueue = io('/help-requests');
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);

    const room = `room-${this.props.room}`;
    console.log(`inside room# ${this.props.room}`);

    this.state = {
      text: '',
      peerData: '',
      showVideo: true,
      userData: this.props.userData,
    };
    socket.emit('join-room', room);
    socket.on('text change', text => this.setState({ text }));

    // Connecting Local and Remote user streams
    comm.on('local', (local) => {
      console.log('Connected to Local!');
      this.refs.localStream1.src = local.stream;
    });
    comm.on('connected', (peer) => {
      console.log('This is what we get when a peer connects: ', peer);
      comm.send(this.props.userData);
      this.refs.peerStream2.src = peer.stream;
    });
    comm.on('data', (peer) => {
      this.setState({ peerData: peer.data });
      this.props.handleScreenSharePeerData(peer.data);
    });
    comm.connect(room, { audio: true });

    // Remove this help request from the list of requests if the session is ended
    comm.on('disconnect', () => {
      socketHelperQueue.emit('removeFromQueue', { roomID: this.props.room });
    });
    window.onbeforeunload = () => {
      socketHelperQueue.emit('removeFromQueue', { roomID: this.props.room });
    };

    // Need to bind this since using es6 syntax
    this.editorUpdated = this.editorUpdated.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  editorUpdated(event) {
    const text = event.target.value;
    this.setState({ text });
    socket.emit('change', text);
  }

  handleVideo() {
    socketHelperQueue.emit('removeFromQueue', { roomID: this.props.room });
    comm.leave();
  }

  render() {
    console.log(this.state.text);
    return (
      <div>
        <NavbarView videoHandler={this.handleVideo} />
        <div className="col-md-6">
          <div className="text-center bg-primary">
            Shared Text Editor
          </div>
          <textarea
            className="session-text-share"
            onChange={this.editorUpdated} value={this.state.text}
          ></textarea>
        </div>
        <div className="col-md-6">
          <div className="text-center bg-primary">Video Chat</div>
          <div>
            <video className="peerVideo col-md-3" ref="peerStream2" autoPlay></video>
            <video className="localVideo" ref="localStream1" autoPlay></video>
          </div>
        </div>
        <div>
          <br />
          <button className="btn btn-block btn-default">
            <Link to="/feedback" >
              Complete Session
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

ScreenShareView.propTypes = {
  sessionData: React.PropTypes.object.isRequired,
  userData: React.PropTypes.object.isRequired,
  room: React.PropTypes.number.isRequired,
  userId: React.PropTypes.number.isRequired,
  handleScreenSharePeerData: React.PropTypes.func.isRequired,
};
window.ScreenShareView = ScreenShareView;
// videoHandler={this.handleVideo.bind(this)}
