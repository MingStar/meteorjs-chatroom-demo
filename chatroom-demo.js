Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.sendMessage.events({
    "submit #send-message": function (event, template) {
      var message = event.target.text.value;
      Messages.insert({
        username: Meteor.user().username,
        text: message,
        createdAt: new Date()
      });
      event.target.text.value = "";
      return false; // prevent default form submit
    }
  });

  Template.messageList.helpers({
    messages: function () {
      return Messages.find();
    },
    messageClass: function() {
      return this.username == "system" ? "system" : "";
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
