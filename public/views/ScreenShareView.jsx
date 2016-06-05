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
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);

    const room = `room-${this.props.room}`;

    this.state = {
      text: '',
      user1: this.props.sessionData.client1ID || 'NOT EXISTING',
      user2: this.props.sessionData.client2ID || 'NOT EXISTING',
      showVideo: true,
      userData: this.props.userData,
    };
    console.log('Screenshare userdata: ', this.props.userData);
    this.editorUpdated = this.editorUpdated.bind(this);
    console.log('joining room', room);

    // join room retrieve room data 2 ways
    // (switching views and refreshing new view has 2 different routes)
    // socket.on('connect', () => console.log('join in connect') || socket.emit('join-room', room));
    socket.emit('join-room', room);

    socket.on('text change', text => this.setState({ text }));
    socket.emit('connectUser', this.props.userId);

    // Icecomm Video Chat. In the future, we can decide which room each person joins.
    const that = this;

    // Connecting local stream
    comm.on('local', (local) => {
      console.log('Connected to Local!');
      that.refs.localStream1.src = local.stream;
    });

    // Connecting remote stream
    comm.on('connected', (peer) => {
      console.log('This is what we get when a peer connects: ', peer);
      that.refs.peerStream2.src = peer.stream;
      that.refs.peerStream2.src.id = peer.ID;
    });

    comm.connect(room, { audio: true });
    // Remove peer stream when disconnected
    comm.on('disconnect', () => {
      that.refs.videoStream1.src = '';
      that.refs.videoStream2.src = '';
      comm.close();
    });
  }

  editorUpdated(event) {
    const text = event.target.value;
    this.setState({ text });
    socket.emit('change', text);
  }

  handleVideo() {
    // comm.leave(true);
    console.log(comm);
    comm.close();
  }

  render() {
    console.log(this.state.text);
    return (
      <div>
        <NavbarView videoHandler={this.handleVideo} />
        <div className="col-md-6">
          <div className="text-center bg-primary">
            Shared Text Editor {this.state.user1} && {this.state.user2}
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
          <button className="btn btn-block btn-default" >
            <Link to="/feedback">
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
