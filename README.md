oAuth2 authorization server using Resource Owner Password Credentials Grant and a JWT bearer token
-----------------------------------------------------------------------------------------

This grant type is used where the client is trusted by the resource owner (the user) and has a client id and 
client secret known by this server.  *Trust* implies the user is willing to enter their username and password into the client, which 
usually means the client is issued or approved by the some organization that owns the authorization server.

eg. the Twitter IOS app issued by Twitter, but not a third-party app what authenticates against Twitter's API.

An IOS client use-case is:
* The user would enter their username and password into the client. These do not need to be stored by the client (but it can use the IOS keystore).
* The client authenticates (grant_type=password) against this server and receives an access token and refresh token. The
 client Id and client secret are also validated by this server.
* The client uses the access token for all subsequent requests (http header Authorization: bearer <token>)
* If the access token expires, the client requests a new one from this server (grant_type=refresh_token)
 and receives a new access token 
* The refresh token is retained by the client so the user doesn't have to login again. 
Once the refresh token has expired the user will need to login again (or start again using credentials in the keystore).

The access token is generated using JWT. The benefits of this token are:
* this server does not need to retain the tokens issued. It just needs to verify them.
* the token can be passed straight through to other servers (eg. microservers) that only need to verify it (ie. they trust the signed JWT)
* the token carries private claims that can be passed straight through to other servers (eg. user role/permission claims)
 
The refresh token is also using JWT, although this probably isn't necessary.
 
 
This demo just stores user and client credentials in memory.
The token is generated using [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

The examples is based on the in-memory example at https://github.com/thomseddon/node-oauth2-server/ but uses JWT tokens instead of the default implementation.


