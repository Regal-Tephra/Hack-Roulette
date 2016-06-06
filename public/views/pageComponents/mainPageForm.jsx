/* global
  React
  NavbarView
  BodyView
  ReactRouter
  MainpageForm
  io
*/

const Link = ReactRouter.Link;

const socket = io('/help-requests');
class MainpageForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      queueStatus: false,
      requestText: '',
      languageChosen: 'Javascript',
      showAlert: { display: 'none' },
      language: '',
    };
    console.log('Mainpage userdata: ', this.props.userData);
    this.updateRequestText = this.updateRequestText.bind(this);
    this.sendRequestText = this.sendRequestText.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  sendRequestText(e) {
    // Send request to serverc
    console.log(this.props.userData);
    if (this.state.requestText === '') {
      this.setState({ showAlert: { display: 'block', color: 'red' } });
    } else {
      console.log('Sending request', this.state.requestText);
      e.preventDefault();
      document.getElementById('text').value = '';
      this.setState({ requestText: '' });

      const dataToSend = {
        requestText: this.state.requestText,
        userData: this.props.userData,
        languageChosen: this.state.languageChosen,
      };
      console.log('data being sent', dataToSend);
      socket.emit('addRequest', dataToSend,
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

  updateLanguage(e) {
    this.setState({ languageChosen: e.target.value });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">Programming Language</label>
          <div className="col-sm-9">
            <select className="form-control" onChange={this.updateLanguage}>
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
          <div className="col-sm-9">
            <textarea
              id="text"
              placeholder="e.g. looking for help with n-queens!"
              rows="4"
              onChange={this.updateRequestText}
            ></textarea>
          </div>
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
