GT Inventory Management System
=====

# Release Notes
#### Features
- Users can define and edit custom attributes.
- Users can define custom equipment types using the defined attributes.
- Users can create instances of equipment.
- Users can perform a simple search for equipment, equipment types, attributes, and attribute values.
#### Known Bugs
- Editing equipment types has initial functionality on front end, but is not connected to the back end.
- Delete buttons are not connected to soft delete functionality on the back end
- Front end code for generating a table has a warning regarding whitespace appearing as a child of `<tbody>`.
#### Future Implementation
- Confirmation dialogs when a user clicks save or delete to prevent accidental edits
- Display acknowledgement to users when an action has been successfully performed.
- Integration with Georgia Tech's Central Authentication System
- Versioning

# Installation Guide
#### Dependencies
This application requires [Node.js]("https://nodejs.org/en/") for installation. Instructions on installing Node can be found at [https://nodejs.org/](https://nodejs.org/).

The [back end web server]("https://github.com/GTInventory/IMS-backend") is required for the application to be functional. Installation instructions for the back end can be found in its Github repository [here]("https://github.com/GTInventory/IMS-backend").

#### Downloading
The application can be downloaded by cloning this repository.

#### Building
After cloning, run this command to install dependencies:

```
npm install
```

#### Running
To run the build version of this prototype, execute:

```
npm start
```

The project will be running on `https://localhost:3006/`
