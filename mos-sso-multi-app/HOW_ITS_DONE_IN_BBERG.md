# this describes how BBerg does SSO

## Flow

- client A calls sso fronted and passes it's orgin and some predefined id (SPID)
- SSO frontednd authenticates against SSO server that generates a security token
- SSO frontend makes a .post to 'localhost:4200/login/callback' which resides which now stores credentials on localstorage (client side javascript)
- now clinet has credentials on localstorage
- ODD: How did SSO server run code on the client?? Some security must be relaxed
- now the client has credentials stored locally it passes them on each ednpoint call to its dedicated clienA serer  (serverA)


## thoughts

This seems to be quite complicated plus it seems questionable a server runs code on a client to save credentials on localstorage

my final question is: now that a client (say localhost:4200) has obtained and stored credentials from a (b)sso server. It can now call it's OWN separate endpoints. How do those endpoints, which are on a diff server) validate the credentials? In JWT, as long as that client's server has access the a common private key it can determine that. That's what I see implied in literature. just odd that disparate servers hinge on a singular private key...seems dangerous. so question again is, now that client is authenticated via sso server how the the client's dedicated server authenticate the endpoint calls that carry the token?
2:49 PM· Read
yes, via jwt... the jwt is signed with the token and this all happens on the localhost server ... the endpoint then validates the JWT token it gets (from the header) using the same key which is also on its server... both (should be) stored on the server in a place that only the server executable can get to.  Key is never exposed to the browser.
roger. so the same key is shared between sso server and individual app servers...huh
no
at this point SSO has nothing to do with it
All SSO does is log you in and pass who you are to the initiating server
JWT just validates who you are to the end points
authentication vs verification
JWT is ALSO used to authenticate that the app has permission to use the end point at all
or rather to verify
there is an attribute called aud
"Audiance"
a server checks that to see if you are one of the audiences it knows about and trust
i c...
server = end point (just to be clear)
It is, frankly, a lot to digest
I think it is why I get all the BSSO/JWT work at BB
yeah...lot's to digest plus lots of diff ways too...
right
I keep going to the simple way (spid)
because there is an alternate that requires a certificate (ssl like thing) ... once you have that the initiating app can then tell the bsso server where to call back to.
what i'm saying is the initiating app get's a callback and stores locally credentials that are originally created by an sso server (which contains a jwt token as well). now the initiating app is logged in ...the subsequent endpoint calls from the initiating app to its own server (not sso) carry the token. The new server needs to authenticate the token carried through. One way is for that server to use the same  private jwt key with sso server and it would validate call just like sso server would have.
no
Once you have JWT, sso is out of the picture
right ...once the client callback is called and localstorage contains jwt token sso is no longer in picture. but the client's dedicated server (which has nothing to do with the sso server) need to validate calls
yes and it does that by validating the jwt token using the private key ... no sso here at all either
right. the private key must be the same key the sso used to generate the original jwt token sent to callback
otherwise it can't validate the jwt token
That is where you are confused
(and yes sso is out of the calls picture)
sso doesn't even know there is a JWT token
ahhhh!
sso ONLY authenticates
who generated the jwt token?
the initiating side converts the sso SAML to JWT
i see...the the initiating side creates the jwt token
i see...jwt token is created LATER by client app not sso app
right
ur right i was conflating authentication with validation
so which entity creates the jwt token...it must somehow share key withe the initiating apps server to validate ai calls
example using BOCS:
entities involved  BSSO, BOCS, REST End Points (REP)
Client goes to BOCS url.  BOCS sees they are not logged in and redirects to BSSO
BSSO makes them login and, upon success, post a payload back to BOCS
BOCS Now, unravels that SAML payload and converts it to a JWT token signing it with private key that it has shared with REPs
BOCS now attaches the JWT to the header of every call it makes to REPs
REP looks for the header, validates it with the (shared) private key and pulls out whatever information it needs
1. Client goes to BOCS url.  BOCS sees they are not logged in and redirects to BSSO
2. BSSO makes them login and, upon success, post a payload back to BOCS
3. BOCS Now, unravels that SAML payload and converts it to a JWT token signing it with private key that it has shared with REPs
4. BOCS now attaches the JWT to the header of every call it makes to REPs
5. REP looks for the header, validates it with the (shared) private key and pulls out whatever information it needs
( just added #s)
in step 2 AND 3...is BOCS the node server?
(ie where is localhost:4200/login/callback running)
we generally check in the client to see if they are logged in (step 2)
just a se
wait
ok.. 2 and 3.. yes BOCS is the node server /login/callback
and three puts the information in an HTML file that is just JavaScript to get the values into session storage
std by ...munching....i find 'and three puts the information in an HTML file that is just JavaScript to get the values into session storage' kinda incredible
In Angular the HTML Interceptor pulls the JWT out of session storage and puts it in the header as it makes a request
yeah i get it onec on localstorage...easy...i'm munching still 'and three puts the information in an HTML file that is just JavaScript to get the values into session storage'
?
i'm looking at how node rendering html and sending data works. That's THE missing item for me. Also, node js must know the initiator was localhost:4200 (same origin)
node IS on localhost:4200
well... on the dev, qa, prod servers
on localhost, we proxy down to a different port
but from a server perspective it is all the same domain/port/server app
we just happen to have ng serve betwwn the client and the node/Express server
node express takes an html template page we have and does string substitution and returns that string to the client
yeah...i'm absorbing the last two statements. ng server kicks off angular's dev server which, here/bocs, runs on localhost:4200...i'm missing the handshake between ng serve/localhost:4200 and node/express servers thinking about it
in angular there is a proxy.conf.json file in the root
from there, you can say, "when ng server is looking for X path, send them to Y path instead

## REFERENCES

- server side proxies: <https://medium.com/better-programming/setup-a-proxy-for-api-calls-for-your-angular-cli-app-6566c02a8c4d>
-
