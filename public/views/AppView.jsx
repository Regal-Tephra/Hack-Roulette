class AppView extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
	    	<div>
	    	  <h1>App Component</h1>
	    	  <ScreenShareView />
	    	  <LandingPageView />
	    	</div>
	    );
  	}
};
var socket = io();

ReactDOM.render(<AppView />, document.getElementById('app'));
window.AppView = AppView;
