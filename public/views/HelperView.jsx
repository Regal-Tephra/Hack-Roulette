/* global
  React
  NavbarView
  BodyView
  ReactRouter
  io
*/

// const Link = ReactRouter.Link;

// BUG: Currently does not dynamically update list of requests

const socket = io('/help-requests');
class HelperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      list: [],
      userData: this.props.userData,
    };
    console.log('Helper userdata: ', this.props.userData);
    socket.on('connect', () => socket.emit('getCurrentQueueList'));
    socket.on('queueList', queueListArray => {
      console.log(queueListArray);
      this.setState({ list: queueListArray });
    });
  }

// JOIN HELP REQUEST ROOM
  // STEP 1: Click interested Room
  // STEP 2: Wait for data about new room
  // STEP 3: REDIRECT TO ROOM

// TRY TO PRINT QUEUELISTARRAY DOWN THERE
  render() {
    return (
      <div>
        <NavbarView />
        <div className="text-center">
          You are helping!!
          <br></br>
          <ul className="list">
            {this.state.list.map((helpRequest, key) => <li key={key}>{helpRequest.userData.displayName} : {helpRequest.text}</li>)}
          </ul>
        </div>
      </div>
  );
  }
}

HelperView.propTypes = {
  userData: React.PropTypes.object.isRequired,
};

window.HelperView = HelperView;
