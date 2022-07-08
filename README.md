# Disney Movies

Diney Movies Search Web Interface with Include Register/Login Feature. 

### Technology 

- Server - ( NodeJs / Express ) 
- Client - ( ReactJs ) 
- DB - ( MongoDB / Mongoose )
- Auth - ( JWT ) 

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,react,mongodb)](https://skillicons.dev)

### Pre-Requirement 

- NodeJs - ( v14.x.x or higher  )
- MongoDB ( v5.x.x ) 

## Set Up Server 

### Navigate and Dependancy Install 
```
cd server 
npm install 
```
### Set up environment Variables 
- add `.env` inside `server` directory 
- Ref [`server/.env-example`](https://github.com/jdamilaspmys/disney-movies/blob/dev/server/.env-example) -> `server/.env` 
```
PORT=3001
MONGODB_URL=mongodb://localhost:27017/disney-movies
```
### Seed Movies 
```
npm run seed
```
expected out-put 
```
Database Connected
Movies Clean Completed !
Movies Seed Completed !
Database Closed
```
### Start Server 
```
npm run start 
```
Server Start http://localhost:3001 
### POSTMAN Collection 

Directory : [`server/postman`](https://github.com/jdamilaspmys/disney-movies/tree/dev/server/postman)
1. `Disney-Movies.postman_collection.json`
2. `Disney-Movies.postman_environment.json`


## Set Up Client 

### Navigate and Dependancy Install 
```
cd client 
npm install
```

### Set up environment Variables 
- add `.env` inside `client` directory 
- Ref [`client/.env-example`](https://github.com/jdamilaspmys/disney-movies/blob/dev/client/.env-example) -> `client/.env` 
```
REACT_APP_SERVER_URL=http://localhost:3001/api/v1
```
### Start Client 
```
npm run start
```
Open in Browser http://localhost:3000


## Support 

- Email : jdamilaspmys@gmail.com 
