/* global
  React
  ScreenShareView
  LoggedinView
  FeedbackView
*/

class BodyView extends React.createClass {
  render() {
    let propPage;
    let pageToRender;
    if (propPage === 'LoggedinView') {
      pageToRender = <LoggedinView />;
    } else if (propPage === 'Session') {
      pageToRender = <ScreenShareView />;
    } else if (propPage === 'Feedback') {
      pageToRender = <FeedbackView />;
    }
    return (
      <div>
        {pageToRender}
      </div>
    );
  }
}

window.BodyView = BodyView;
