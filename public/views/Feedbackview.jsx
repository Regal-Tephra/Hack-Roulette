/* global React ReactRouter NavbarView */

const Link = ReactRouter.Link;

const FeedbackView = (props) =>
  (<div>
    <NavbarView />
    <div className="text-center">
      <p> How was your experience? </p>
      <input type="text"/>
      <button><Link to="/">Submit Feedback</Link></button>
    </div>
  </div>
  );

window.FeedbackView = FeedbackView;
