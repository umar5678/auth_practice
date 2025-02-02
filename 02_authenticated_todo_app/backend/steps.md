- initialize the project

- utils dir conains:

  - AsyncHandler.js : for handling request and response in contrllers
  - ApiResponse.js for giving response in a AsyncHandler
  - ApiError.js, for giving errors in a AsyncHandler
  - the error that is not given to ApiError is automatically catched by errorhandler middleware

- middlewares dir contains:

  - authMiddleware.js for verifying JWT tokien and cookies to verify user
  - errorHandler.js for handling errors in from the AsycHandler. it also catch errors from ApiError.js
  - notFound.js for handling 404

- db dir: contains connectDB.js for connecting to the database
- routes dir contains: user and quotes routes
- controllers dir contains: user and quotes controllers
- models dir contains: user model

- make a register controller
- make a login controller
- make a logout controller
- make a refreshAccessToken controller