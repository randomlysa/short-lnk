import React from 'react';
import { Session } from 'meteor/session';

export default class ListLinksFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  } // constructor

  componentDidMount() {
    this.checkboxTracker = Tracker.autorun(() => {
      // Sync checkboxs with Session
      this.setState({
        showVisible: Session.get('showVisible'),
        showShortURL: Session.get('showShortURL')
      });
    }); // Tracker.autorun
  } // componentDidMount

  componentWillUnmount() {
    this.checkboxTracker.stop();
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          Show hidden links &nbsp;
          <input
            className="checkbox"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) =>{
              // When the checbox is changed (clicked), set it to the opposite
              // of whatever it was.
              Session.set('showVisible', !e.target.checked)
            }}
          />
        </label>
        <label className="checkbox">
          Hide short url &nbsp;
          <input
            className="checkbox"
            type="checkbox"
            checked={!this.state.showShortURL}
            onChange={(e) =>{
              Session.set('showShortURL', !e.target.checked)
            }}
          />
        </label>
      </div>
    ) // return
  } // render
} // export default class
