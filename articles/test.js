var yaml = require( 'yaml' )
  , fs = require( 'fs' );

var contents = fs.readFileSync( 'lua-tor-exit-nodes.yml' );

var test = yaml.eval(contents.toString());
console.log(test);
