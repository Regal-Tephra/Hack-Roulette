/* global
  React
  ScreenShareView
  LoggedinView
  FeedbackView
  MainpageView
*/

class BodyView extends React.createClass {
  render() {
    let propPage;
    let pageToRender;
    if (propPage === 'MainPage') {
      pageToRender = <MainpageView />;
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
