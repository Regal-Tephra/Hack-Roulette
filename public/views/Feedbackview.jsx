/* global React ReactRouter NavbarView */

const Link = ReactRouter.Link;

// TODO: Need to send feedback to server as part of a session/transaction
// Advanced TODO: Add modal popup for feedback after the session vs linking to another page

const FeedbackView = (props) =>
  (<div>
    <NavbarView />
    <div className="text-center">
      <div>
        <p> How would you rate your experience out of 5? </p>
        <label className="radio-inline">
          <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 1
        </label>
        <label className="radio-inline">
          <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> 2
        </label>
        <label className="radio-inline">
          <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" /> 3
        </label>
        <label className="radio-inline">
          <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" /> 4
        </label>
        <label className="radio-inline">
          <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option5" /> 5
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
          // onChange={this.updateRequestText}
        ></textarea><br />
      </div>
      <button><Link to="/">Submit Feedback</Link></button>
    </div>
  </div>
  );

window.FeedbackView = FeedbackView;
