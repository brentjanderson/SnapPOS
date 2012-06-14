var Tables = new Meteor.Collection('tables');

if (Meteor.is_client) {
    Meteor.autosubscribe(function() {
        Meteor.subscribe("tables");
    });
    
    var table_set = Tables.find({});
    var handle = table_set.observe({
        added: function(a) {
            Meteor.setTimeout(function() {
                $('.table_listview').listview('refresh');
            }, 100);
        },
        removed: function() {
        
        }
    });

  Template.table_listview.tables = function () {
    return Tables.find();
  };

  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    console.log('Server started.');
//     var socket = require('socket.io');
  });
}