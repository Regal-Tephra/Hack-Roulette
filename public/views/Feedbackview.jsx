/* global React ReactRouter NavbarView io $ */

const Link = ReactRouter.Link;

// TODO: Need to send feedback to server as part of a session/transaction

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
      // TODO: Need to grab user information
      user: '',
      // TODO: Need to grab session ID information
      sessionID: '',
      rating: this.state.rating,
      feedbackText: this.state.feedbackText,
    };
    $.ajax({
      url: '/feedback',
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function (data) {
        console.log('Successful Post!', data);
        this.setState({
          rating: '',
          feedbackText: '',
        });
        // TODO Uncheck all the boxes
        // TODO: This method actually isn't changing the page itself
        window.location = '#/';
      }.bind(this),
      error: (err) => {
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
      <form className="text-center" onSubmit={this.handleSubmit}>
        <div>
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
        </div><br />
        <div>
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
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    );
  }
}

FeedbackView.propTypes = {
  userData: React.PropTypes.object.isRequired,
};
window.FeedbackView = FeedbackView;
