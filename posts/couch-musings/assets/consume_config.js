// Include and parse the configuration into an Object.
var config = require("./config.json");

// Log out the CouchDB host.
console.log(config.couch.host);
// => localhost

// Make a connection with an imaginary connect function using the settings
connect(config.couch.host, config.couch.port, config.couch.db, function() {});
