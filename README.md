oAuth2 auth server using Resource Owner Password Credentials Grant and a JWT bearer token
-----------------------------------------------------------------------------------------

This grant type is used where the client (eg. an IOS app) is trusted by the resource owner (the user) and has a client id and 
client secret known by this server.

A use-case is:
* The user would enter their username and password into the client, the client authenticates (grant_type=password) and receives
 an access token and refresh token from this server (nb. the client has a client Id and secret too, separately issued, that
 are also validated by this server). 
* The client uses the access token for all subsequent requests (http header Authorization: bearer <token>)
* If the access token expires, the client requests a new one from this server (grant_type=refresh_token)
 and receives a new access token 
* The refresh token is retained by the client so the user doesn't have to login again. eg. in the IOS keystore. 
Once the refresh token has expired the user will need to start again.

The access token is generated using JWT. The benefits of this token are:
* this server does not need to retain the tokens issued. It just needs to verify them.
* the token can be passed straight through to other servers (eg. microservers) that only need to verify it (ie. they trust the signed JWT)
* the token carries private claims that can be passed straight through to other servers (eg. user role/permission claims)
 
The refresh token is also using JWT, although this probably isn't necessary.
 
This demo just stores user and client credentials in memory.
The token is generated using JWT [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

It's based on the in-memory example at:
https://github.com/thomseddon/node-oauth2-server/
but uses JWT tokens instead of the default implementation.


