# expense_manager
## Stack
- Vue.js
- Express
- MongoDB

## GCP Deployment
http://34.125.120.241:8080/  

## Local Deployment
Backend requires 3 env variables
- PORT
- MONGO_URL
- JWT_SECRET

The variables must be stored in .env at backend

for deployment in linux based OS

```
cd frontend
npm install && npm build
mv dist/ ../backend/
cd ..
npm install && node . 
```

## Example Screenshot
![image](https://user-images.githubusercontent.com/26710303/163253890-ac26ba52-9f21-4263-bb68-82bc19287480.png)
![image](https://user-images.githubusercontent.com/26710303/163254122-5caea675-9fd0-4c22-8095-8ec07e9232b5.png)
