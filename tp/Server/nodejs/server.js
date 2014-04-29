var _ = require('underscore');
var express = require('express');
var http = require('http');
var uuid = require('node-uuid');
var cors = require('./cors');
var app = express();
var server = http.createServer(app);

var conf = require('./server.json');

var contacts = require(conf.contacts);
var sessions = {};

var context = '/rest';
var authHeader = 'Auth-Token';

// use command-line arg for root if passed
if (process.argv.length == 3)
  conf.root = process.argv[2];

app.use(express.static(__dirname + '/' + conf.root));

console.log(__dirname + '/' + conf.root)

app.use(express.bodyParser());
app.use(cors);

app.get(context + '/i10n', function (req, res) {
  fs = require('fs');
  console.log('GET ./languages/' + req.query.lang + '.json');
  fs.readFile('../../TP0/languages/' + req.query.lang + '.json', 'utf8', function (err, data) {
    console.log('returning', data);
    res.send(data);
  });
});

app.get(context + '/contacts', function (req, res) {
  console.log('GET /contacts return list of', contacts.length, 'contacts');
  res.send(contacts);
});

var createHandler = function (req, res) {
  var id = _.max(_.pluck(contacts, 'id')) + 1;
  console.log('POST /contacts with data ', req.body, 'adding id', id);
  req.body.id = id;
  contacts.push(req.body);
  res.send(req.body);
}

app.post(context + '/contacts', createHandler);
app.put(context + '/contacts', createHandler);

app.get(context + '/contacts/:id', function (req, res) {
  var result = _.findWhere(contacts, {
    id: parseInt(req.params.id)
  });
  console.log('GET /contacts/' + req.params.id, 'returning', result);
  // simulate a delay in the server
  setTimeout(function () {
    res.send(result)
  }, 2000);
  //res.send(result);
});

var updateHandler = function (req, res) {
  var result = _.findWhere(contacts, {
    id: parseInt(req.params.id)
  });
  _.extend(result, req.body)
  console.log('PUT /contacts/' + req.params.id + ' with data ', req.body, 'returning', result);
  res.send(result);
}

app.put(context + '/contacts/:id', updateHandler);
app.post(context + '/contacts/:id', updateHandler);

app.delete(context + '/contacts/:id', function (req, res) {
  var token = req.header(authHeader);
  var user = token ? _.invert(sessions)[token] : null;
  console.log('test ', sessions, token, user);
  if (!user) {
    console.log('DELETE refused, Authentication required!');
    res.send(401, 'Authentication required!');
  } else {
    contacts = _.reject(contacts, function (contact) {
      return contact.id == req.params.id;
    });
    console.log('DELETE /contacts/' + req.params.id);
    res.send();
  }
});

var loginHandler = function (req, res) {
  sessions[req.params.user] = uuid.v4();
  console.log('LOGIN', sessions);
  res.header(authHeader, sessions[req.params.user]);
  res.send();
}

app.post(context + '/login/:user', loginHandler);
app.put(context + '/login/:user', loginHandler);

server.listen(conf.port);
console.log('Express server listening on port', server.address().port);