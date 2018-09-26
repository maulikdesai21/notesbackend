Express & ES6 REST API Notes Back-end
==================================


Getting Started
---------------

```sh
# clone it
git 
cd 

# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
 npm start
```



Notes 
----------------------
The code is trying to connect to a cloud mongodb provider: https://mlab.com/

If you are behind a corporate firewall it would fail to connect. 
Please change mongo URL in **src/config.json**

if you change the DB please run the script below to create test users

```sh
curl -X POST \
  http://localhost:8081/createUser \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: c5669148-5b34-4723-ad98-3ca596e89ba8' \
  -d '{
	"name":"Jhon",
	"email":"Jhon@njit.edu",
	"password":"12345"
}'

```

