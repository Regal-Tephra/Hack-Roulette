/* global
  React
  NavbarView
  BodyView
  ReactRouter
  io
*/

// const Link = ReactRouter.Link;

const socket = io();
class HelperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      list: [],
    };
    socket.emit('initializeConnection', 'HelperView');
    socket.emit('initialGetQueueList');
    socket.on('queueList', queueListArray => {
      console.log(queueListArray);
      this.setState({ list: queueListArray });
    });
  }
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
