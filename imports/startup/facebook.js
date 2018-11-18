ServiceConfiguration.configurations.remove({
  service: "facebook"
});

if (Meteor.isDevelopment) {
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.FBappId,
    secret: Meteor.settings.FBsecret
  });
} else {
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: process.env.FBappId,
    secret: process.env.FBsecret
  });
}

Accounts.onCreateUser(function (options, user) {

  if (!user.services.facebook) {
      return user;
  }
  user.username = user.services.facebook.name;
  user.emails = [{address: user.services.facebook.email}];

  return user;
});