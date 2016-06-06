const Link = ReactRouter.Link;

class ProfileView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
     			<NavbarView />
     			<div className="list-group-item clearfix subcontainer help-request-container">
     			{
     					console.log(this.props.userData.avatar)
     				}
     				<div className='img'>
     					<img src={this.props.userData.avatar} width="100" height="100" ></img>
     				</div>
     				
     				<div className='name'>	
     					<h1>{this.props.userData.displayName}</h1>
     				</div>

     				<div className="usersHelped">
     					<text>Users helped: </text>
     				</div>

     				<div className="numRequestsMade">
     					<text>Number of help requests made: </text>
     				</div>
	     		</div>
     		</div>
		);
	}
}

window.ProfileView = ProfileView;