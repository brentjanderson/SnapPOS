Tables = new Meteor.Collection('tables');

// This thing fires exceptions all over the place.
Tables.find({}).observe({
    added: function(a) {
        Meteor.setTimeout(function() {
            try {
            $('.table_listview').listview('refresh');
            } catch(e){
                //console.log(e);
            }
        }, 100);
    },
    removed: function() {
        
    }
});

Template.partial_table_listview.tables = function () {
    return Tables.find();
};