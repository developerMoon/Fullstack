//additional file to handle localtunel crash
var localtunnel = require('localtunnel');

localtunnel(5000, {subdomain: 'jhdskfjd' }, function(err, tunnel){
  console.log('LT running');
});
