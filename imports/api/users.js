import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email })


  return true
});

// Configure the email body to not use a hash URL.
Accounts.emailTemplates.resetPassword.text = (user, url) => {
  const newUrl = url.replace('/#/', '/');
  return `
  Hello,

  To reset your password, please click the link below.
  ${newUrl}

  If you didn't request a password reset, you can ignore this email.

  Thank you
  `;
}

Meteor.methods({
  'user.sendPasswordReset'(userId) {
    console.log('user.sendPWR')
    Accounts.sendResetPasswordEmail(userId)
  }
})
