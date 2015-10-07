
var helpers = {
  json: function(context, key) {
    if ( typeof key === 'string' ){
      key = key.split('.');
      for ( var i = 0, l = key.length; i <l; i++ ){
        context = context[ key[i] ];
      }
    }
    return JSON.stringify(context);
  },

  dump: function( val ){
    return [ '<pre>', JSON.stringify( val, true, '  ' ), '</pre>' ].join('\n');
  }
};

module.exports.register = function(handlebars) {
  for (var key in helpers) {
    handlebars.registerHelper(key, helpers[key]);
  }
}