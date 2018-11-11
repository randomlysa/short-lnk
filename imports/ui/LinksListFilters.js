import React from 'react';
import { Session } from 'meteor/session';

export default class ListLinksFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showVisible: true
    };
  } // constructor

  componentDidMount() {
    this.checkboxTracker = Tracker.autorun(() => {
      // Sync checkbox with Session 'showVisible'
      this.setState({
        showVisible: Session.get('showVisible')
      });
    }); // Tracker.autorun
  } // componentDidMount

  componentWillUnmount() {
    this.checkboxTracker.stop();
  }

  render() {
    return (
      <div>
        <label>
          Show hidden links &nbsp;
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) =>{
              visible: Session.set('showVisible', !e.target.checked)
            }}
          />
        </label>
      </div>
    ) // return
  } // render
} // export default class
