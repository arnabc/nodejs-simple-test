# Instructions

Fork this repo, and when done issue a pull request for review.

# Requirements

1. This app must serve an index.ejs page
2. The index acts as a "contact us" form
3. The app must process the form POST, validate the parameters
4. If there are validation errors, the user should be notified about them
5. If there are no errors, the app should log the results and save the result to a mongo database




# Installation
Before running the application, install the following global dependencies:

- ``` npm install -g bower ```
- ``` npm install -g grunt-cli ```
- ``` npm install -g yo ```
- You need to have Mongo running on the local system (the host can be configured in `config/development.js`)

## Implementation detail

- Uses MEAN.JS structure
- Uses 'swig' as the templating engine instead of 'ejs'.
- Uses angular in the frontend
- Allows email notification to a pre-configured email address when new contact requests are made
- Has mocha test cases for Model save operation
- The admin email for notification can be configured in `config/development.js`
- [http://localhost:3000/contact_requests](http://localhost:3000/contact_requests) will display the list of contact requests made.