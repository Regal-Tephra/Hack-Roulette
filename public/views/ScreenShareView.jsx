/* global
   React
   _
   io
   */

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
        <p>{this.props.userId}</p>
        <textarea
          className="session-text-share"
          onChange={this.editorUpdated} value={this.state.text}
        ></textarea>
      </div>
    );
  }
}

ScreenShareView.propTypes = {
  userId: React.PropTypes.string,
};
window.ScreenShareView = ScreenShareView;
