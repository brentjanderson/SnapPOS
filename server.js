//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , io = require('socket.io')
    , port = (process.env.PORT || 8080)
    , everyauth = require('everyauth');

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "00ba170b5e59a54aa71c95cbf5b03573"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX' 
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX'
                 ,error: err 
                },status: 500 });
    }
});
server.listen(port);

//Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
    
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
  
  socket.on('refresh-tables',function() {
    socket.emit('list-tables',fetchTables());
  });
  
  socket.on('debug', function(d) {
    console.log(d);
  });
  
  // Initialization
  socket.emit('list-tables',fetchTables());
});

function fetchTables() {
    return [{name:'Table A'},{name:'Table B'}];
}


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////
server.get('/admin', function(req,res){
    res.render('admin.jade', {
        locals: {
                title : 'SnapPOS Administrator',
                description: '',
                author: 'Brent Anderson',
                analyticssiteid: ''
                }
    });
});

server.get('/tables', function(req,res){
  res.render('tables.jade', {
    locals : { 
              title : 'Your Page Title'
             ,description: 'Your Page Description'
             ,author: 'Your Name'
             ,analyticssiteid:  ''
            }
  });
});

server.get('/tickets', function(req,res){
  res.render('tickets.jade', {
    locals : { 
              title : 'Your Page Title'
             ,description: 'Your Page Description'
             ,author: 'Your Name'
             ,analyticssiteid:  ''
            }
  });
});

server.get('/', function(req,res){
  res.redirect('/tables');
});

server.get('/table', function(req,res){
  res.render('table-detail.jade', {
    locals : { 
              title : 'Your Page Title'
             ,description: 'Your Page Description'
             ,author: 'Your Name'
             ,analyticssiteid:  ''
            }
  });
});


//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
