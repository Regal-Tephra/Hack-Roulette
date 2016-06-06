const Link = ReactRouter.Link;
const socket = io('/help-requests');

class ProfileView extends React.Component {
	constructor(props) {
		super(props)

		this.state = {userData: { helpRequests: [], helperSessions: [] } };

		var that = this;
		socket.emit('getUserStats', this.props.userData.id);
		socket.on('receiveUserData', function(data){
			that.setState({userData: data });
			console.log(data);
			console.log(Array.isArray(that.state.userData.helperSessions));
		});
	}

	render() {
		return (
			<div>
     			<NavbarView />
     			<div className="list-group-item clearfix subcontainer help-request-container">
     			{
     					console.log(this.props.userData.avatar)
     				}
     				<div className='col-sm-3'>
     					<img src={this.props.userData.avatar} width="155" height="155" ></img>
     				</div>
     				
     				<div className='col-sm-9'>
     					<div className='row'>
		     				<div id='name'>	
		     					<h1>{this.props.userData.displayName}</h1>
		     				</div>
		     			</div>
	     				<div className='row'>
		     				<div className="col-sm-6">
		     					<h3 id='numHelp'>{JSON.stringify(this.state.userData.helperSessions.length)}</h3>
		     					<h6 id='help'>Users helped</h6>
		     				</div>

		     				<div className="col-sm-6">
		     					<div>
		     					<h3 id='numHelp'>{JSON.stringify(this.state.userData.helpRequests.length)}</h3>
		     					<h6 id='help'>Help requests made</h6>
		     					</div>
		     				</div>
	     				</div>
	     			</div>
	     		</div>
     		</div>
		);
	}
}

window.ProfileView = ProfileView;