/* global
  React
  NavbarView
  BodyView
  ReactRouter
  io
*/

// const Link = ReactRouter.Link;

// BUG: Currently does not dynamically update list of requests

const socket = io();
class HelperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      list: [],
    };
    socket.emit('initializeConnection', 'HelpRequests');
    socket.emit('initialGetQueueList');
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
            {this.state.list.map(helpRequest => <li>{helpRequest}</li>)}
          </ul>
        </div>
      </div>
  );
  }
}

window.HelperView = HelperView;
