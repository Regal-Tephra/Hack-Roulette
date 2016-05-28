/* global React */

const socket = io();
class ScreenShareView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ['l']};
    socket.on('text change', function(text){
      console.log('RECEIVED', text.split('\n'));
      this.setState({value: text.split('\n')});
    }.bind(this));
    socket.emit('connectUser', this.props.userId);
  }
  convertToText(html = '') {
    let text;
    console.log('html', html);
    text = html.replace('\n', '');
    text = text.replace(/<\/p>/gi, '</p>\n');
    text = text.slice(0, text.length-1)

    // Have browser strip html tags for us in false DIV element
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    text = tempDiv.textContent || tempDiv.innerText || '';
    text = _.unescape(text);
    console.log('text', text);
    return text;
  }
  // convertToDivText(text = '') {
  //   console.log(text);
  //   return text.replace(/\n/g, '<br />');
  // }

  editorUpdated(event) {
    const cleanedUpText = this.convertToText(event.target.innerHTML);
    // console.log(cleanedUpText);
    this.setState({
      value: [] //cleanedUpText.split('\n')
    });
    socket.emit('change', cleanedUpText);
  }
	render() {
    console.log(this.state.value.map(line => '<p>'+line+'</p>'));
		return (
      <div>
        <p>{this.props.userId}</p>
        <div contentEditable onChange={this.editorUpdated.bind(this)} onBlur={this.editorUpdated.bind(this)}>
          {this.state.value.map(line => '<p>'+line+'</p>')}
        </div>
      </div>
    );
	}
}
// {this.state.value.map(line => <p>{line}</p>)}
window.ScreenShareView = ScreenShareView;
        // <input className="form-control"
        // type="text"
        // value={this.state.value}
        // onChange={this.handleChange.bind(this)}
        // />
