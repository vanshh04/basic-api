# Node-Project
->I have my main app running in index.js , 
->All the controller functions to implement all the functions like get single user , get all users etc etc are in the file controller.js . 
->The models folder contains database model containing all the fields for user details in User.js
->Routes folder contians the express router which assign appropriate controller functions to the requested route.
->For authentication , a login path to get user credentials is stored in the controllers folder , it verifies the user credentials like email and password.
->Authentication middleware extracts the token from the auth header and it verifies the token with the secret key and then if verification is successful , it assigns the decoded user info which is the payload to the requestbody which then proceeds to the next route.



