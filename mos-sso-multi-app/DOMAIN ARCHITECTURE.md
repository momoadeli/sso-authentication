# What i mean by SSO

To access various client apps without re-logging in, users just need to login to one of them. Logging out of any app will logout all. This is SSO or 'federated login'.

## Domain Architecture: Mo's Multi App (Identity Federation --ie SSO )

This project intends to demonstrate a auth & identity federation (single signon) which redirects to different front and back end apps during various login states. Note this is similar to my prev work experiences, where a central login and look n feel eventually redirected to the originally desired app if not already logged in. Mostly internal apps. The frontends envisioned are:

login SPA clients (generic login page on port 4500)

- 'products' SPA client (on port 4200)
- 'phonebook' SPA ( on port 4201)

## Architecture decisions

(
  SEE Primary Reference by Ankur Anand:
  <https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340>

  SEE Alternate References (note 'nonce'):
  <https://stackoverflow.com/questions/33723033/single-sign-on-flow-using-jwt-for-cross-domain-authentication>
  <https://stackoverflow.com/questions/4306728/how-to-create-a-shared-login-service-across-multiple-domains>
  <https://security.stackexchange.com/questions/175712/how-to-implement-cross-domain-auto-login-sso-without-browser-redirects-for-unlo>
)

1. The VERY KEY notion is, the notion of CORS is a contract between a browser and server NOT between servers. As such diffenet servers can call each other. This is the fundamental notion how localstorage can be shared between clients--even of different domains.
2. Another VERY  notion is that the login page is rendered via the login/auth server. This way an additional and separate login page/app is no longer required to pass arounf redirect urls. This is VERY KEY.
3. Another VERY KEY notion is in the Ankur's refence app, the client and server pages are rendered server-side. Maqking things easier but ignoring SPA option. We'll attempt the client apps to be Angular SPAs (and eventually anything like a mobile app --flutter, kotlin, swift, ect)
4. Another VERY KEY notion is that when login is authenticated the client apps page can be rendered as well with local storage as ejs content to store new keys. nYES THIS WY LOCALSTORAGE IS MODIFIED by a client's server!!
5. JWT flow/info: <https://blog.angular-university.io/angular-jwt/>

Although we can use a third party Identity Provider (IdP) to identify login iud/pwd, here this process is handled manually on our own database.

## Flow (also see architecture decisions above)

  SEE Primary Reference by Ankur Anand:
  <https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340>

- The SSO behaves this way: An SPA app logs in (doesn't matter whether products, phonebook or generic login page). They all authenticate against an authentication server which returns an

NOTE 2: To configure readable url names instead of localhost modify private/etc/hosts file to handle various client and server apps:

- IMPORTANT!! if want to use IPs other tha 127.0.0.1 (127.x.x.x) then add them via below command so system's refreshed and they're recognized in /private/etc/hosts file:
  <https://serverfault.com/questions/402744/assigning-multiple-ip-addresses-to-localhost-os-x-10-6/402749>

NOTE 3: You can run Angular SPAs dev server on other than 'localhost:4200'. After updating etc/hosts (and if needed adding new IPs) by adding them in one of two ways:

- in package.json: <https://stackoverflow.com/questions/37762125/set-default-host-and-port-for-ng-serve-in-config-file>
- OR add them to angular.json the in server attribute as new object {host:xx, port: xxx}'

By taking steps above a real website look and feel can be simulated.

## Proposed configuration parameters

- auth server url
- query parameter strings/names (eg 'sssoToken' etc)
- private keys
- public keys (server config.keys)
- public key file path
- key issuer and validity strings
- client server white list urls (who are the sso consumer apps)
- allowed server origins
- maybe roles and policies
- dev vs prod
- ports?
- session secret ('extress-session')

## Examples

- <https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340>
- stackoverflow sites: <https://stackoverflow.blog/2010/09/11/global-network-auto-login/>
