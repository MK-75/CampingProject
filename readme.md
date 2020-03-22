# Yelp Camp

# Flow of the project

# Create a landing page

- include link to the campgrounds page

# Add a campgrounds page that lists all the campgrounnd

- Create a campground model
- Create an ejs file for rendering the campgrounds

# Create header and footers, add basic styling using bootstrap

# Create new campground components

- setup new campgrounds post route(route to take data from the form)
- setup route to show forms
- add basic unstyled form(route to the form for creating a new campground)

# Review the schema
- add more fields to the schema which are needed

# Restfull routes
--------------------------------------------------
name    url               http-verb   desciption
--------------------------------------------------

Index   /campgrounds       GET         display all the campground
New     /campgrounds/new   GET         display the form
Create  /campgrounds       POST        Adds a new campground
Show    /campground/:id    GET         Display a specific campground 

# Refactor app.js
- make a more modular code

# Add seeds file(if you want)

# Add a comments model
- associate each comment with the campgroud specified
- create association in the db
- Modify the show route 
- in the show page add code to display the comments

# Create a route to create comment
- Add comments route (nested route)
- Add new comments form

# Comments Routes
use the route /campground/:id before using following routes
=====================================================
name    url             http-verb   description
=====================================================
New     /comments/new   GET         
Create  /comments       POST

# Style the comments

# Add Authentication
- Add the required packages (passport, passport-local-strategy, express-session)
**Note**: Create a user model
- Setup the passport
- Add the authentication routes

# Authentication Routes
============================================
name          url           http-verb
============================================
Registration  /register     GET
Registration  /register     POST
Login         /login        GET
Login         /login        POST

- Create a middleware to check if a user is logged in or not. 
- This will be helpful to check if the user can add comments or not.s

nav navbar-nav navbar-right
