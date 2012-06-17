window.WelcomeView = Backbone.View.extend({
    template:Template.page_welcome,

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.TablesView = Backbone.View.extend({
    template:Template.page_tables,

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.TableView = Backbone.View.extend({
    template:Template.page_table,

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});


var AppRouter = Backbone.Router.extend({
    routes:{
        "":"welcome",
        "tables":"tables",
        "table":"table",
        "alerts":"alert"
    },
 
    welcome:function () {
        console.log('welcome');
        this.changePage(new WelcomeView());
    },
 
    tables:function () {
        console.log('tables');
        this.changePage(new TablesView());
    },
    
    table:function () {
        console.log('table');
        this.changePage(new TableView());
    },
 
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));

        // We don't want to slide the first page
        if (this.firstPage) {
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {
            changeHash:false
        });
    }
});

Meteor.startup(function() {
    $(document).bind('pageinit', function () {
        console.log('JQM Disabled');
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    
        // Remove page from DOM when it's being replaced
        $('div[data-role="page"]').live('pagehide', function (event, ui) {
            $(event.currentTarget).remove();
        });
        app = new AppRouter();
        Backbone.history.start();
        $(this).unbind('pageinit');
    });
    
    console.log('document ready');
});
