var fetchAddresses = function(filter, callback, config) {

  'use strict';

  if (!config) throw new Error('cartoDB config not specified');

  filter = (filter || '').toLowerCase();

  var query = 'select * from ' + config.table;

  if (filter) {
    query += " where " +
      "lower(name) like '%" + filter + "%' or " +
      "lower(address) like '%" + filter + "%'";
  };

  //http://opensas.cartodb.com/api/v2/sql?q=select%20*%20from%20test&api_key=ba413f91177fd6622768fe021ac611f000fde23f
  var url = 'http://' + config.user + '.cartodb.com/api/v2/sql?' +
    'q=' + encodeURIComponent(query) +
    (config.apikey ? '&api_key=' + config.apikey : '');

  $.get(url, function(data) {
    callback(data);
  });

  return;
};
