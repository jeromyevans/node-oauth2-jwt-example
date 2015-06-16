var model = module.exports;

// based on https://github.com/thomseddon/node-oauth2-server/tree/master/examples/memory

// In-memory datastores
var oauthAccessTokens = [];
var oauthRefreshTokens = [];

var oauthClients = [{
  clientId : 'thom',
  clientSecret : 'nightworld',
  redirectUri : ''
}];

// key is grant_type
// value is the array of authorized clients
var authorizedClientIds = {
  password: [
    'thom'
  ],
  refresh_token: [
    'thom'
  ]
};

// current registered users
var users = [ {
    id : '123',
    username: 'thomseddon',
    password: 'nightworld'
  }
];


// Functions required to implement the model for oauth2-server

// generateToken
//  the default implementation is fine, but it we want to use JWT we need to override
// to generate the token
//model.generateToken(type, req, callback) {
//
//};

// fetch the access token for the given bearer token (key) in the datastore
model.getAccessToken = function (bearerToken, callback) {
  for(var i = 0, len = oauthAccessTokens.length; i < len; i++) {
    var elem = oauthAccessTokens[i];
    if(elem.accessToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};


// adds the token to the store
model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
  oauthAccessTokens.unshift({
    accessToken: accessToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  callback(false);
};

// required for grant_type=refresh_token
// address the token to the store
model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
  oauthRefreshTokens.unshift({
    refreshToken: refreshToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  callback(false);
};

// required for grant_type=refresh_token
// fetch the refresh token for the given bearer token (key) in the datastore
model.getRefreshToken = function (bearerToken, callback) {
  for(var i = 0, len = oauthRefreshTokens.length; i < len; i++) {
    var elem = oauthRefreshTokens[i];
    if(elem.refreshToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

// tbd - not essential, but it makes sense that revoke is supported
// https://www.npmjs.com/package/node-oauth2-server#revokerefreshtoken-refreshtoken-callback
model.revokeRefreshToken  = function (refresh, callback) {
  for(var i = 0, len = oauthRefreshTokens.length; i < len; i++) {
    var elem = oauthRefreshTokens[i];
    if(elem.refreshToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

// authenticate the client specified by id and secret
model.getClient = function (clientId, clientSecret, callback) {
  for(var i = 0, len = oauthClients.length; i < len; i++) {
    var elem = oauthClients[i];
    if(elem.clientId === clientId &&
      (clientSecret === null || elem.clientSecret === clientSecret)) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

// determine whether the client is allowed the grant type
model.grantTypeAllowed = function (clientId, grantType, callback) {
  callback(false, authorizedClientIds[grantType] &&
    authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0);
};

// authenticate a user
// for grant_type password
model.getUser = function (username, password, callback) {
  for (var i = 0, len = users.length; i < len; i++) {
    var elem = users[i];
    if(elem.username === username && elem.password === password) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

// for grant_type client_credentials
// given client credentials
//   authenticate client
//   lookup user
//   return that user...
//     oauth replys with access token and renewal token
//model.getUserFromClient = function(clientId, clientSecret, callback) {
//
//};