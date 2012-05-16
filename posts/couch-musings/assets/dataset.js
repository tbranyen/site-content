// Load the Miso Project Dataset library
var Miso = require("miso.dataset");

// Load the Dataset Couchdb importer and parser from the current working
// directory.
Miso.load("couchdb-importer");
Miso.load("couchdb-parser");

// Create a new data set for this request
var ds = new Miso.Dataset({
  auth: config.couch.user + ":" + config.couch.pass,
  host: config.couch.user + "." + config.couch.host,
  db: config.couch.db,

  // Receives a nano connection object and a done function.
  view: function(conn, done) {
    // Fetch the traffic design doc, by_date View.
    return conn.view("traffic", "by_date", done);
  },

  // Use the CouchDB importer/parser
  importer: Miso.Importers.Couchdb,
  parser: Miso.Parsers.Couchdb
});
