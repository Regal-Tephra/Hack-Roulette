/* global React ReactRouter NavbarView io */

const Link = ReactRouter.Link;

// TODO: Need to send feedback to server as part of a session/transaction

class FeedbackView extends React.Component {
  constructor(props) {
    super(props);

    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.handleFeedbackText = this.handleFeedbackText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      rating: '',
      feedbackText: '',
    };
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

  handleSubmit() {
    // Handle submit. Send ajax request to server.. or emit through sockets?
      // TODO Send data back to the server
      // As well as the data about the feedback and rating,
        // we also have to associate it with a session ID and Users
    this.setState({
      rating: '',
      feedbackText: '',
    });
  }

  render() {
    return (<div>
      <NavbarView />
      <div className="text-center">
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
        <button><Link to="/">Submit Feedback</Link></button>
      </div>
    </div>
    );
  }
}
window.FeedbackView = FeedbackView;
