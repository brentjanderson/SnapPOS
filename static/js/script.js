/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();
  
  socket.on('list-tables', function(d) {
      $('.table-list').empty();
      for (table in d) {
        $('<li><a href="/table" data-transition="slide">'+d[table].name+'</a></li>').appendTo($('.table-list.ui-listview'));
      }
      $('.table-list.ui-listview').listview('refresh');
  });
});
