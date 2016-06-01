/* global
  React
  NavbarView
  BodyView
  ReactRouter
*/

const Link = ReactRouter.Link;

// const MainpageView = (props) =>
//   (<div>
//     <NavbarView />
//     <div className="text-center" >
//       Please Enter Your Why You Need Help and the Language
//       <br></br>
//       <input className="col-lg-offset-4" placeholder="e.g. get help including end queens!">
//       </input><br></br>
//       <button><Link to="/screenshare">Get Help Now!</Link></button>
//     </div>
//   </div>
//   );


const socket = io();
class MainpageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queueStatus: false };
  }

  queued(event) {
    socket.emit('queued', 'Insert User ID Here');
    console.log('Emitting!!!');
  }

  render() {
    return (
      <div>
        <NavbarView />
        <div className="text-center" >
          Please Enter Your Why You Need Help and the Language
          <br></br>
          <input className="col-lg-offset-4" placeholder="e.g. get help including end queens!">
          </input><br></br>
          <button onClick={this.queued}>Get Help Now!</button>
        </div>
      </div>
  );
  }
}

window.MainpageView = MainpageView;
