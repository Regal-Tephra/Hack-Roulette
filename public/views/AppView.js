class AppView extends React.Component {
  render() {
    return <div><h1>App Component</h1><LaunchPageView /></div>;
  }
}

React.render(<AppView />, document.body);
