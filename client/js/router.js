//window.WelcomeView = Backbone.View.extend({
//    template:Template.page_welcome,
//
//    render:function (eventName) {
//        $(this.el).html(this.template());
//        return this;
//    }
//});
//
//window.TablesView = Backbone.View.extend({
//    template:Template.page_tables,
//
//    render:function (eventName) {
//        $(this.el).html(this.template());
//        return this;
//    }
//});
//
//window.TableView = Backbone.View.extend({
//    template:Template.page_table,
//
//    render:function (eventName) {
//        $(this.el).html(this.template());
//        return this;
//    }
//});
//
//
//var AppRouter = Backbone.Router.extend({
//    routes:{
//        "":"welcome",
//        "tables":"tables",
//        "table":"table"
//    },
// 
//    welcome:function () {
//        this.changePage(new WelcomeView());
//    },
// 
//    tables:function () {
//        this.changePage(new TablesView());
//    },
//    
//    table:function () {
//        this.changePage(new TableView());
//    },
// 
//    changePage:function (page) {
//        $(page.el).attr('data-role', 'page');
//        page.render();
//        $('body').append($(page.el));
//        $.mobile.changePage($(page.el), {
//            changeHash:false
//        });
//    }
// 
//});
//
//$('#p_welcome').bind('pageinit', function () {
//    console.log('document ready');
//    app = new AppRouter();
//    Backbone.history.start();
//});
