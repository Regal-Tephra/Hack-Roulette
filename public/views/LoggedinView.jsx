/* global React */

const LoggedinView = (props) => {
  return <div>{props}</div>;
};


class LoggedinView extends React.Component {
  render() {
    return (
      <div>
        <h1>Loggedin View</h1>
        <NavbarView />
        <BodyView />
      </div>
    );
  }
}

window.LoggedinView = LoggedinView;
