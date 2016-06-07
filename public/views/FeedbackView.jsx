/* global
   React
   ReactRouter
   NavbarView
   io
   $ */

class FeedbackView extends React.Component {
  constructor(props) {
    super(props);
    this.feedbackUrl = '/feedback';
    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.handleFeedbackText = this.handleFeedbackText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      rating: '',
      feedbackText: '',
      userData: this.props.userData,
    };
    console.log('Feedback userdata: ', this.props.userData);
  }

  componentDidUpdate() {
    console.log('Current Rating: ', this.state.rating);
    console.log('current FeedbackText: ', this.state.feedbackText);
  }

  handleRatingClick(e) {
    // Change state of rating to value of clicked
    this.setState({ rating: e.target.value });
  }

  handleFeedbackText(e) {
    // Update feedback text based on what is typed
    this.setState({ feedbackText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {
      userData: this.props.userData,
      peerData: this.props.peerData,
      rating: this.state.rating,
      feedbackText: this.state.feedbackText,
    };

    $.ajax({
      url: '/feedback',
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: data => {
        console.log('Successful Post!', data);
        this.setState({
          rating: '',
          feedbackText: '',
        });
        window.location = '#/';
      },
      error: err => {
        console.log('Woo we got an error');
        console.log(err);
        console.error(err.toString());
        this.setState({
          rating: '',
          feedbackText: '',
        });
        window.location = '#/';
      },
    });
  }

  // TODO: Instead of manually typing out all the rows, I could have done a map function
  render() {
    return (<div>
      <NavbarView />
      <form
        className="text-center col-sm-6 col-sm-offset-3 form-container"
        onSubmit={this.handleSubmit}
      >
        <div className="form-group">
          <p> How would you rate your experience out of 5? </p>
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
              onChange={this.handleRatingClick}
            /> 1
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
              onChange={this.handleRatingClick}
            /> 2
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="option3"
              onChange={this.handleRatingClick}
            /> 3
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio4"
              value="option4"
              onChange={this.handleRatingClick}
            /> 4
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio5"
              value="option5"
              onChange={this.handleRatingClick}
            /> 5
          </label>
        </div>
        <div className="form-group">
          <p> How was your experience? </p>
          <textarea
            id="text"
            className="col-lg"
            placeholder="e.g. I loved my experience!"
            rows="4"
            cols="49"
            value={this.state.feedbackText}
            onChange={this.handleFeedbackText}
          ></textarea><br />
        </div>
        <button type="submit" className="btn btn-success">Submit Feedback</button>
      </form>
    </div>
    );
  }
}

FeedbackView.propTypes = {
  userData: React.PropTypes.object.isRequired,
  peerData: React.PropTypes.object.isRequired,
};
window.FeedbackView = FeedbackView;
