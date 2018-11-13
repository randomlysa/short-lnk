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

  return true;
});

// Configure the email body to not use a hash URL.
// Alternative option? https://stackoverflow.com/a/28622020
Accounts.emailTemplates.resetPassword.text = (user, url) => {
  const newUrl = url.replace('/#/', '/');
  return `
  Hello,

  To reset your password, please click the link below.
  ${newUrl}

  If you didn't request a password reset, you can ignore this email.

  Thank you
  `;
};

// Set email 'from' and 'subject.'
Accounts.emailTemplates.from =  "Short Lnk App <su@randomlysa.com>";
Accounts.emailTemplates.resetPassword.subject = () => {
  return  "Reset your Short Lnk Password";
}
