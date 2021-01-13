# What i mean by SSO

To access various client apps without re-logging in, users just need to login to one of them. Logging out of any app will logout all.
Note, SSO makes no reference to number of times one logs in. It only means same credentials are use to login to federated sites even if you log in separately.

## Domain Architecture: Mo's Multi App (Identity Federation --ie SSO )

This project intends to demonstrate a identity federation (single sigon) which redirects to different front and back end app. Note this is similar to my prev work experiences, where a central login and look n feel eventually redirected to the originally desired app if not already lgged in. Mostly internal apps. The frontends envisioned are:

- login SPA client (generic login page on port 4500)
- products SPA client (on port 4200)
- phonebook SPA ( on port 4201)

## Architecture decisions

(
  SEE References (note 'nonce'):
  <https://stackoverflow.com/questions/33723033/single-sign-on-flow-using-jwt-for-cross-domain-authentication>
  <https://stackoverflow.com/questions/4306728/how-to-create-a-shared-login-service-across-multiple-domains>
  <https://security.stackexchange.com/questions/175712/how-to-implement-cross-domain-auto-login-sso-without-browser-redirects-for-unlo>
)

At the end, local/session/cookie storage cabnnot be shared between apps in different domains/subdomains. Must be in same domain. To share auth bin apps in different domains each app MUST login again/separately and obtain credentials.

- determine if various client SPAs that share login are on same domain/subdomin or not. This has serious ramification on sharing cookies and local stoerage
- determine if will use a third party Identity Provider (IdP) or not. If so, an SSO solution might come out of the box

## Flow (also see architecture decisions above)

- The SSO behaves this way: An SPA app logs in (doesn't matter whether products, phonebook or generic login page). They all authenticate against an authentication server which returns an
  auth token in the body, or, cookie (eg JWT token) and that token is saved in localStorage. The authentication process starts with an producst or phonebook SPA app which checks on login
  against localStorage (in APP_INITIALIZER) and if not logged on the SPA redirects to the login SPA, which interacts with authentications server and stores auth token in local storage.
NOTE 1: SINCE THE CLIENT APPS MUST SHARE LOCALSTORAGE THEY MUST ALL SHARE SAME ORIGIN. SEE:
- <https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin>
- <https://en.wikipedia.org/wiki/Same-origin_policy#Origin_determination_rules>

NOTE 2: To configure readable url names instead of localhost:

- add urls to IP 127.0.0.1 in /private/stc/hosts file
- if want to use IPs other tha 127.0.0.1 (127.x.x.x) then add them via below command so they're recognized in /private/etc/hosts file:
  https://serverfault.com/questions/402744/assigning-multiple-ip-addresses-to-localhost-os-x-10-6/402749

NOTE 3: You can run Angular SPAs dev server on other than 'localhost:4200'. After updating etc/hosts (and if needed adding new IPs) by adding them in one of two ways:

- in package.json: <https://stackoverflow.com/questions/37762125/set-default-host-and-port-for-ng-serve-in-config-file>
- OR add them to angular.json the in server attribute as new object {host:xx, port: xxx}'

By taking steps above a real website look and feel can be simulated.

## Proposed configuration parameters

- auth server url
- all related ports & ips
- redirect urls (why?)
- list of valid app ids

## Examples

- stackoverflow sites: <https://stackoverflow.blog/2010/09/11/global-network-auto-login/>
