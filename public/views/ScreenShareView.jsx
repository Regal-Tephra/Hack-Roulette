/* global
   React
   _
   ReactRouter
   NavbarView
   Icecomm
   localVideo
   */

const comm = new Icecomm('vtygIA1vTxzSy5zkUnO0ZJvEosIUwWYoEQc1kttEN6qWvNWp1S');
const Link = ReactRouter.Link;
const socket = io();
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.editorUpdated = this.editorUpdated.bind(this);
    socket.on('text change', text => {
      this.setState({ text });
    });
    socket.emit('connectUser', this.props.userId);
    comm.connect('my_room');
    const that = this;
    comm.on('local', (options) => {
      that.refs.videoStream1.src = options.stream;
    });
    comm.on('connected', (options) => {
      console.log('This is what we get when a peer connects: ', options);
      that.refs.videoStream2.src = options.stream;
    });
    comm.on('disconnect', function(options) {
      // document.getElementById(options.callerID).remove();
      that.refs.videoStream2.src = '';
    });
  }

  editorUpdated(event) {
    const text = event.target.value;
    this.setState({ text });
    socket.emit('change', text);
  }
  render() {
    console.log(this.state.text);
    return (
      <div>
        <NavbarView />
        <div className="text-center">
          <p>{this.props.userId}</p>
          <textarea
            className="session-text-share"
            onChange={this.editorUpdated} value={this.state.text}
          ></textarea>
          <button><Link to="/feedback">Complete Session</Link></button>
          <video className="localVideo" ref="videoStream1" autoPlay></video>
          <video className="peerVideo" ref="videoStream2" autoPlay></video>
        </div>
      </div>
    );
  }
}

ScreenShareView.propTypes = {
  userId: React.PropTypes.string,
};
window.ScreenShareView = ScreenShareView;
