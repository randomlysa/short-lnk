ServiceConfiguration.configurations.remove({
  service: "facebook"
});

ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: '275046823147468',
  secret: '93c12bdb5536cee6527f57bb526f0fd7'
});

Accounts.onCreateUser(function (options, user) {

  if (!user.services.facebook) {
      return user;
  }
  user.username = user.services.facebook.name;
  user.emails = [{address: user.services.facebook.email}];

  return user;
});