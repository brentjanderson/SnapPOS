if (Meteor.is_client) {
    var Tables = new Meteor.Collection('tables');

    Tables.find({}).observe({
        added: function(a) {
            Meteor.setTimeout(function() {
                $('.table_listview').listview('refresh');
            }, 100);
        },
        removed: function() {
        
        }
    });

    Template.partial_table_listview.tables = function () {
        return Tables.find();
    };

    Template.waiter_header.events = {
        'click #add-table': function(e) {
            console.log('Adding table...');
            Tables.insert({
                name:'New Table'
            });
        }
    };

}