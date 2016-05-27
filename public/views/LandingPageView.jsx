class LandingPageView extends React.Component {
    render() {
    	return (
        	<div>
        		<h1>Landing Page View</h1>
        		<Description />
        	</div>
        );
    }
}

var Description = () => (
	<div className='description'>
		<Login />
	</div>
);

class Login extends React.Component {
    handleLogin() {
        window.location = 'auth/github'
    };


    render() {
        return (
            <div className='login'>
                <button className='loginbtn' onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
}
window.LandingPageView = LandingPageView;