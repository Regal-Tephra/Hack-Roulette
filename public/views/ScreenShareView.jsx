/* global
   React
   _
   ReactRouter
   NavbarView
   Icecomm
   localVideo
   io
   */

// SCREENSHARE TODOS:
  // 1. Get client1 and client2 information into the page
  // 2. Get the reason for help onto the page as well

// Need to remove API Key.
const comm = new Icecomm('3VnlMbNVtaQ17iOJu8zt22nMojgdnPcaR14nTGAaykJbObGKC');
const Link = ReactRouter.Link;
const socket = io('/screenshare');
const socketHelperQueue = io('/help-requests');
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);

    const room = `room-${this.props.room}`;
    console.log(`inside room# ${this.props.room}`);
    // this.room = this.props.room;

    this.state = {
      text: '',
      user1: this.props.sessionData.client1ID || 'NOT EXISTING',
      user2: this.props.sessionData.client2ID || 'NOT EXISTING',
      showVideo: true,
      userData: this.props.userData,
    };
    console.log('Screenshare userdata: ', this.props.userData);
    this.editorUpdated = this.editorUpdated.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    console.log('joining room', room);

    socket.emit('join-room', room);

    socket.on('text change', text => this.setState({ text }));

    // Connecting local stream
    comm.on('local', (local) => {
      console.log('Connected to Local!');
      this.refs.localStream1.src = local.stream;
    });

    // Connecting remote stream
    comm.on('connected', (peer) => {
      console.log('This is what we get when a peer connects: ', peer);
      this.refs.peerStream2.src = peer.stream;
    });

    comm.connect(room, { audio: true });
    // Remove peer stream when disconnected
    comm.on('disconnect', () => {
      console.log('inside!');
      socketHelperQueue.emit('removeFromQueue', { roomID: this.props.room });
    });

    // Unqueues when if user closes the window
    window.onbeforeunload = () => {
      socketHelperQueue.emit('removeFromQueue', { roomID: this.props.room });
    };
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
};
window.ScreenShareView = ScreenShareView;
// videoHandler={this.handleVideo.bind(this)}
