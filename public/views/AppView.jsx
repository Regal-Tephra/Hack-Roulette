var socket = io();
class AppView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'hello'};
		socket.on('text change', function(text){
			this.setState({value: text});
		}.bind(this));
	}

	handleChange(event) {
    this.setState({
      value: event.target.value
    });
    socket.emit('change', this.state.value);
  }

	render() {
		return (
	    	<div>
	    	  <h1>App Component</h1>
	    	  <ScreenShareView />
	    	  <LandingPageView />
	    	  <input className="form-control"
        	type="text"
        	value={this.state.value}
        	onChange={this.handleChange.bind(this)}
      	  />
	    	</div>
	    );
  	}
};


ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
