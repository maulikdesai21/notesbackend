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
  -H 'Postman-Token: 4b8e57e2-410c-44fa-ae6c-f385e68f0f27' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1hcmtAZ21haWwuY29tIiwiX2lkIjoiNWJhYTU4MGM5YjQzZjUzODM5NGVjMGQyIiwiaWF0IjoxNTM3OTcxOTQ0LCJleHAiOjE1MzgwNTgzNDR9.IUjeQGM7oAn9v6XRq9AYPRBUWXwjhdls9MBhz3cN_zA' \
  -d '{
	"name":"Jhon",
	"email":"Jhon@njit.edu",
	"password":"12345"
}'
```

