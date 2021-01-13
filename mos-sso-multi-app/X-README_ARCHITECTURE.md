# Mo's Multi App (Identity Federation --ie SSO )

This project intends to demonstrate a identity federation (single sigon) which redirects to different front and back end app. Note this is similar to my prev work experiences, where a central login and look n feel eventually redirected to the originally desired app if not already lgged in. Mostly internal apps. The frontends envisioned are:

- login (angular + dev server): refer to angular cli and angular.io for scaffolding, best practices, and references (unique port #)
- products (angular + dev server and maybe flutter) (unique port #)
- phonebook (angular + dev server and maybe flutter) (unique port #)

refer to node documents for scaffolding, best practices, and references (unique port number)

Currently there will be a separate backends per front end written on node & express (maybe redis for login). The backends envisioned are:

- login (node (start server) express, and maybe redis)
- products (node & express) (unique port #)
- phonebook (node & express) (unique port #)

## Cloud

- AWS is envisioned as the final cloud platfrom

## Port numbers

There will be a separate localhost port # for each frontend and backend servers.
  Note 1: different port #'s are NOT in the same domain so security tokens in cookies, localStorage, etc
  can be shared (reference : <https://stackoverflow.com/questions/54552925/does-a-different-port-number-mean-a-different-domain>)
  Note 2: node or ANY server cannot access localStorage. Obviously a different machine from client but huge security issue anyway do credentials and tokens''
  must be passed back to client in a cookie or a request body or http header itself. A good read on this is at:
Examples can be:

- login client: port # 4201
- products client: port # 4202
- phonebook client: port# 4203

- login backend/node: port # 3000 (note if using redis might need an additiona server/port #)
- products backend/node: port # 3001
- phonebook backend/node: prot # 3002

## Example usage: ALWAYS LOGIN FIRST AND BE REDIRECTED TO DESIRED APP

To login to any app, the url is: 'localhost:(port#)/(app name). If not logged in, redirect to /login and after successful login, the system will redirect back to: localhost:(port#)/(app name)

e.g.: To login to the products app enter this url: localhost:4202/products. System will redirect to localhost:4201/login and after successuful login the fronend will be redirected back to localhost:4202/products/home
