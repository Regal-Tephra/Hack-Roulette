/* global
   React
   NavbarView
   io
*/

const socket = io('/help-requests');

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: { helpRequests: [], helperSessions: [] } };
    socket.emit('getUserStats', this.props.userData.id);
    socket.on('receiveUserData', data => {
      this.setState({ userData: data });
      console.log(data);
      console.log(Array.isArray(this.state.userData.helperSessions));
    });
  }

  render() {
    return (
      <div>
        <NavbarView />
        <div className="list-group-item clearfix subcontainer help-request-container">
          <div className="col-sm-3">
            <img
              src={this.props.userData.avatar}
              width="155" height="155"
              alt="User Avatar"
            />
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div id="name">
                <h1>{this.props.userData.displayName}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <h3 id="numHelp">{JSON.stringify(this.state.userData.helperSessions.length)}</h3>
                <h6 id="help">Users helped</h6>
              </div>

              <div className="col-sm-6">
                <div>
                  <h3 id="numHelp">{JSON.stringify(this.state.userData.helpRequests.length)}</h3>
                  <h6 id="help">Help requests made</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileView.propTypes = {
  userData: React.PropTypes.object.isRequired,
};

window.ProfileView = ProfileView;
