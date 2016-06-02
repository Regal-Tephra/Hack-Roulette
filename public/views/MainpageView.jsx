/* global
  React
  NavbarView
  BodyView
  ReactRouter
  io
*/

// const Link = ReactRouter.Link;

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
    this.state = {
      queueStatus: false,
      requestText: '',
    };
    // emit the correct listener for mainpageview here when created
    // socket.emit('initializeConnection', 'HelperView');
    this.updateRequestText = this.updateRequestText.bind(this);
    this.sendRequestText = this.sendRequestText.bind(this);
  }

  sendRequestText(e) {
    e.preventDefault();
    console.log('Emitting', this.state.requestText);
    socket.emit('queued', this.state.requestText);
    document.getElementById('text').value = '';
    this.setState({ requestText: '' });
  }

  updateRequestText(e) {
    this.setState({ requestText: e.target.value });
  }

  render() {
    return (
      <div>
        <NavbarView />
        <form>
          <div className="text-center" >
            Please Enter Your Why You Need Help and the Language
            <br></br>
            <textarea
              id="text"
              className="col-lg"
              placeholder="e.g. looking for help with n-queens!"
              rows="4"
              cols="49"
              onChange={this.updateRequestText}
            ></textarea><br></br>
            <input type="submit" onClick={this.sendRequestText} value="Get Help Now!"/>
          </div>
        </form>
      </div>
  );
  }
}

window.MainpageView = MainpageView;
