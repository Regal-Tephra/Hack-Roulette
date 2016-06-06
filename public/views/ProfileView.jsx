const Link = ReactRouter.Link;

class ProfileView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
     			<NavbarView />
     			<div class="form-group">
     				<text>Name: {this.props.userData.displayName}</text>
	     		</div>
     		</div>
		);
	}
}

window.ProfileView = ProfileView;