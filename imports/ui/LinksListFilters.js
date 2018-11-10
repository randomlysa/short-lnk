import React from 'react';
import { Session } from 'meteor/session';

export default () => {
  return (
    <div>
      <label>
        Show hidden links &nbsp;
        <input type="checkbox" onChange={(e) =>{
          visible: Session.set('showVisible', !e.target.checked)
        }} />
      </label>
    </div>
  )
} // export default
