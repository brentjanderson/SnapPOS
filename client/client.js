Template.waiter_header.events = {
    'click #add-table': function(e) {
        console.log('Adding table...');
        Tables.insert({
            name:'New Table'
        });
    }
};

Template.page_table.table = function() {
    return Tables.findOne();
}