/* global
  React
  NavbarView
  BodyView
  ReactRouter
  MainpageForm
  io
*/

const socket = io('/help-requests');
class MainpageForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      queueStatus: false,
      requestText: '',
      userData: this.props.userData,
      showAlert: { display: 'none' },
      language: '',
    };
    console.log('Mainpage userdata: ', this.props.userData);
    this.updateRequestText = this.updateRequestText.bind(this);
    this.sendRequestText = this.sendRequestText.bind(this);
  }

  sendRequestText(e) {
    // Send request to serverc
    console.log(this.state.requestText);
    if (this.state.requestText === '') {
      this.setState({ showAlert: { display: 'block', color: 'red' } });
    } else {
      console.log('Sending request', this.state.requestText);
      e.preventDefault();
      document.getElementById('text').value = '';
      this.setState({ requestText: '' });
      socket.emit('addRequest', { requestText: this.state.requestText, userData: this.state.userData },
        data => {
          // set roomId and switch to screenshare view
          console.log('Server responded', data);
          this.props.sessionRoom.id = data.id;
          console.log('sessionRoom', this.props.sessionRoom.id);
          window.location = '#/screenshare';
        });
    }
  }
  updateRequestText(e) {
    // update state based on textbox change
    this.setState({ requestText: e.target.value });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">Programming Language</label>
          <div className="col-sm-9">
            <select className="form-control">
              <option>Javascript</option>
              <option>Ruby</option>
              <option>C+</option>
              <option>Java</option>
              <option>Python</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Description </label>
          <textarea
            id="text"
            className="col-sm-9"
            // className="col-lg"
            placeholder="e.g. looking for help with n-queens!"
            rows="4"
            // cols="49"
            onChange={this.updateRequestText}
          ></textarea><br></br>
        </div>
        <div className="h3" style={this.state.showAlert}>Please enter a valid request</div>
        <div>
          <button
            className="btn btn-success btn-block"
            type="submit"
            onClick={this.sendRequestText}
          >Get Help Now!</button>
        </div>
      </form>
    ); }

}

MainpageForm.propTypes = {
  userData: React.PropTypes.object.isRequired,
  sessionRoom: React.PropTypes.object.isRequired,
};


window.MainpageForm = MainpageForm;
