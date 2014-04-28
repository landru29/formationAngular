var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console');

var config = container.config;
console.log('Startup Vert.x server with config: ' + JSON.stringify(config));

var server = vertx.createHttpServer();
var routeMatcher = new vertx.RouteMatcher();

console.log('Load contacts from file ' + config.contacts);
vertx.fileSystem.readFile(config.contacts, function (err, res) {
    if (!err) {
        var contacts = JSON.parse(res);
        for (var i = 0; i < contacts.length; i++) {
            vertx.getMap('zenContact.contacts').put(contacts[i].id.toString(), JSON.stringify(contacts[i]));
        }
        console.log(contacts.length + ' contact(s) have been loaded into memory!');
    } else {
        console.log('Error: ' + err);
    }
});

routeMatcher.get('/rest/contacts', function (req) {
    req.response.headers().set("Content-Type", "application/json");
    req.response.end(vertx.getMap('zenContact.contacts').values());
});

routeMatcher.get('/rest/contacts/:id', function (req) {
    var id = req.params().get('id');
    if (vertx.getMap('zenContact.contacts').containsKey(id)) {
        req.response.headers().set("Content-Type", "application/json");
        req.response.end(vertx.getMap('zenContact.contacts').get(id));
    } else {
        req.response.statusCode(404).statusMessage("No contact found with id=" + id).end();
    }
});

routeMatcher.post('/rest/contacts', function (req) {
    req.bodyHandler(function (body) {
        var contact = JSON.parse(body);
        contact.id = new Date().getTime();
        vertx.getMap('zenContact.contacts').put(contact.id.toString(), JSON.stringify(contact));
        req.response.end(contact.id);
    });
});

routeMatcher.put('/rest/contacts/:id', function (req) {
    req.bodyHandler(function (body) {
        var contact = JSON.parse(body);
        vertx.getMap('zenContact.contacts').put(contact.id.toString(), JSON.stringify(contact));
        req.response.end();
    });
});

routeMatcher.delete('/rest/contacts/:id', function (req) {
    var token = req.headers().get("Auth-Token");
    if (!token || !vertx.getMap('zenContact.sessions').containsValue(token)) {
        req.response.statusCode(401).statusMessage("Authentication required!").end();
    } else {
        var id = req.params().get('id');
        if (vertx.getMap('zenContact.contacts').containsKey(id)) {
            vertx.getMap('zenContact.contacts').remove(id);
            req.response.end();
        } else {
            req.response.statusCode(404).statusMessage("No contact found with id=" + id).end();
        }
    }
});

routeMatcher.post('/rest/login/:user', function (req) {
    var user = req.params().get('user');
    vertx.getMap('zenContact.sessions').put(user, java.util.UUID.randomUUID().toString());
    req.response.putHeader("Auth-Token", vertx.getMap('zenContact.sessions').get(user)).end();
});

routeMatcher.noMatch(function (req) {
    var file = req.path() === '/' ? 'index.html' : req.path();
    req.response.sendFile(config.root + '/' + file);
});

server.requestHandler(routeMatcher).listen(config.port, config.host, function (err) {
    if (!err) {
        console.log('HTTP server UP and serving static files with root: ' + config.root);
        console.log('REST server UP and serving resource: /rest/contacts');
        var url = 'http://'+config.host+':'+config.port;
        console.log('Open browser to '+url);
        java.awt.Desktop.getDesktop().browse(java.net.URI.create(url));
    } else {
        console.log('Error: ' + err);
    }
});
