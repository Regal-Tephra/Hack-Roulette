/* global
   React
   _
   ReactRouter
   NavbarView
   Icecomm
   localVideo
   io
   */

// Need to build in screensplit
  // Half of screen will be dedicated to the screenshare
  // Other half of screen will be dedicated to the textshare
  // Complete Session button will be at the bottom of the screen


// Need to remove API Key.
const comm = new Icecomm('3VnlMbNVtaQ17iOJu8zt22nMojgdnPcaR14nTGAaykJbObGKC');
const Link = ReactRouter.Link;
const socket = io('/screenshare');
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);

    console.log('This is props', this.props);
    console.log('This is sessionData', this.props.sessionData);

    this.state = {
      text: '',
      user1: this.props.sessionData.client1ID,
      user2: this.props.sessionData.client2ID,
      showVideo: true,
      userData: this.props.userData,
    };
    console.log('Screenshare userdata: ', this.props.userData);
    this.editorUpdated = this.editorUpdated.bind(this);
    socket.emit('initializeConnection', 'ScreenShareView');
    socket.on('text change', text => {
      this.setState({ text });
    });
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

    comm.connect('my_room', { audio: true });
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
          <div className="text-center bg-primary">Shared Text Editor {this.state.user1} && {this.state.user2}</div>
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
};
window.ScreenShareView = ScreenShareView;
// videoHandler={this.handleVideo.bind(this)}
