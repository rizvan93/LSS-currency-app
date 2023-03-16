# LSS Currency Application

A web based application to track currency and book refresher trainings

## Description

This web application allows aircrew to:
* track their flying currencies based on a set of currency requirements
* make bookings to refresh their currencies
* have their currencies after completing a refresher

### [Try the application here (login required)](lss-currency.cyclic.app)

## Tools and Libraries

* Github for repository
* Cyclic for deployment
* Visual Studio Code for development
  * Prettier extension for formatting
* MongoDB to host database
* ejs engine to display views
* Node and the following libraries (and their dependencies)
  * express: server development
  * mongoose: connection to MongoDB database
  * bcrypt: hashing of passwords
  * dayjs: parsing, manipulating, and formatting dates and times
  * method-override: using PUT and DELETE methods from browser
  * express-session & connect-mongo: authorization of users
  
## Timeframe

5 working days

## Wireframe and User Stories

## Development Approach and Details

This application implements basic Create Read Update Delete (CRUD) functions and was implemented using a model-view-controller architectural approach as described below. My approach and timeline in developing this game was to:

#### Day 1
1. Set up server using express and connect to MongoDB database using mongoose 
2. Define Trainee and Training models
3. Plan and set up routers for basic CRUD functions using REST conventions

#### Day 2
1. Set up CRUD controllers and views for trainees
2. Set up CRUD controllers and views for trainings

#### Day 3
1. Set up algorithm to track currencies and display currencies within trainee views
2. Set up controllers and views for trainees to book and complete trainings
3. Set up algoritm to update currencies

#### Day 4
1. Set up User model
2. Set up routers, controllers, and views for users
3. Implement authentication and authorization across application paths

#### Day 5
1. Deploy application
2. Style application

### _Model_

The application stores data in three Collections within a MongoDB Database, with the Schemas described in the picture below.

### _View_

The views were generated using ejs to dynamically display information passed by the Controller when rendered. 

The views comprise tables to display relevant information to users, as well as links, input fields, and buttons for the user to interact with the application. 

Lastly, ejs partials were used to streamline the code within the views. For example, the create and edit views both share a partial that contains the form fieldset to be displayed.

### _Controller_

There are four categories of controllers in the application: for trainees, trainings, bookings, and users. 

The controllers for trainings and trainees allow basic CRUD functions for the Trainee and Trainings models. The routes for each of these functions adhere to REST conventions.

The controllers for bookings link the Trainee and Trainings models, and allow trainees to book trainings that are available to them. Within the database, this is done by storing the Object Id of the Trainee within the Training document. There is also a controller to verify a that a trainee has undergone a particular training, which will update the trainees' currencies respectively. The currency requirements are stored in a separate file for easy updating when necessary. 

Lastly, the controllers for users allow the creation and deletion of users, as well as authentication and authorisation. Bcrypt is used to hash passwords upon creation and login so that the passwords are not stored on the database. Once a user is authenticated after login, express-session is used to authorize them for access to various parts of the app, according to their user account. 

## Future Developments & Improvements

While the app contains basic functions, there are three key areas for future developments:

### 1. Simultaneous Asynchronous Functions. 

There are some asyncrhonous functions that the controllers can perform simultaneously, such as updating multiple Trainee documents after a Training is completed. However, these are currently done synchronously due to ease of development. Promises can be used to execute these steps asynchronously and speed up run time. 

### 2. Validation and Error Responses. 

While the model Schema does restrict data to fit the expected data types, the validation can be further expanded to include dates, and to prevent the user from submitting these inputs at the server side. Furthermore, error handling has not yet been implemented. 

### 3. Authorized Views.

Lastly, the application currently does not change the views based on the authorization. While restricted actions cannot be performed by unauthorized users, this can be improved by hiding restricted functions from the views of unauthorized users in the first place. 

## Summary

This is my first attempt at creating a fully functioning web based application. I was able to successfully create an application which fulfils the user stories. Nonetheless, there is significant room for improvement in terms of validation and error handling before it is ready for deployment. 
