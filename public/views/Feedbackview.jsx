/* global React NavbarView */

const FeedbackView = (props) =>
  <div>
    <NavbarView />
    <div>{props} This is the feedback view</div>
  </div>;

window.FeedbackView = FeedbackView;
