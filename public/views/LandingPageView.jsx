class LandingPageView extends React.Component {
    render() {
    	return (
    	<div>
    		<h1>Landing Page View</h1>
    		<Description />
    	</div>
        )
    }
}

var Description = () => (
	<div className='description'>
		<Login />
	</div>
);

var Login = () => (
	<div className='login'>
		<button className='loginbtn'> Login </button>
	</div>
);
window.LandingPageView = LandingPageView;