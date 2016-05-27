/* global React */

const socket = io();
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'hello'};
    socket.on('text change', function(text){
      this.setState({value: text});
    }.bind(this));
    socket.emit('connectUser', this.props.userId);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    socket.emit('change', this.state.value);
  }
	render() {
		return (
      <div><input className="form-control"
      type="text"
      value={this.state.value}
      onChange={this.handleChange.bind(this)}
      /><p>{this.props.userId}</p></div>
    );
	}
}

window.ScreenShareView = ScreenShareView;