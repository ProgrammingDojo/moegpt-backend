1. must use node 18.15.0, nvm use 18.15.0 (Reason: node 21.4.0 esm has issue I cannot solve)
2. use .env to setup credentials, dev mode is on local server, ask .env file when start development
3. curl test command
- Post: signup
curl -d '{"email":"testuser@gmail.com","password":"Test1234"}' -H "Content-Type: application/json" -X POST http://localhost:5555/api/signup
- Post: login
curl -d '{"email":"testuser@gmail.com","password":"Test1234"}' -H "Content-Type: application/json" -X POST http://localhost:5555/api/login