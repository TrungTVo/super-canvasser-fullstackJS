# Super-Canvasser
## 1. Overview

Super Canvasser helps organizations run door-to-door canvassing campaigns (sales campaign, fund-raising campaign, election campaign, opinion poll, etc.).  The system supports three roles: 
1. Campaign managers, who manage the information associated with campaigns
2. Canvassers, who visit the locations in campaigns on assigned dates
3. System administrators, who manage user accounts

## Some screen shots of the application
<img width="1279" alt="screen shot 2018-11-19 at 12 20 02 am" src="https://user-images.githubusercontent.com/20756728/48687857-6ad61380-eb91-11e8-85a2-8e569d50be1a.png">
<img width="1279" alt="screen shot 2018-11-19 at 12 18 58 am" src="https://user-images.githubusercontent.com/20756728/48687887-8ccf9600-eb91-11e8-92ac-9ecc8a850e12.png">
<img width="1279" alt="screen shot 2018-11-19 at 12 19 20 am" src="https://user-images.githubusercontent.com/20756728/48687869-77f30280-eb91-11e8-9c20-d04008973cc7.png">
<img width="1280" alt="screen shot 2018-11-19 at 12 20 36 am" src="https://user-images.githubusercontent.com/20756728/48688013-1aab8100-eb92-11e8-8ad3-b4c177a01729.png">
<img width="1280" alt="screen shot 2018-11-19 at 12 19 38 am" src="https://user-images.githubusercontent.com/20756728/48687934-bab4da80-eb91-11e8-873f-4d1938e11d6e.png">
<img width="1280" alt="screen shot 2018-11-19 at 12 21 59 am" src="https://user-images.githubusercontent.com/20756728/48687881-84775b00-eb91-11e8-85b6-3ad7e4e0990d.png">
<img width="1280" alt="screen shot 2018-11-19 at 12 22 37 am" src="https://user-images.githubusercontent.com/20756728/48687893-90631d00-eb91-11e8-9301-d2b3e6cc23c4.png">
<img width="1280" alt="screen shot 2018-11-19 at 12 22 15 am" src="https://user-images.githubusercontent.com/20756728/48688080-7118bf80-eb92-11e8-8c35-6caba9023a3e.png">

# Usage
To run the application:
```
$ npm run dev
```
To run only back-end server:
```
$ npm run server
```
To run only front-end client:
```
$ npm run client
```

# Dependencies
Install back-end dependencies:
```
"dependencies": {
    "body-parser": "^1.18.3",
    "concurrently": "^4.0.1",
    "express": "^4.16.4",
    "moment": "^2.22.2",
    "mysql": "^2.16.0",
    "node-cmd": "^3.0.0",
    "nodemon": "^1.18.4"
}
```
Install front-end dependencies:
```
"dependencies": {
    "@material-ui/core": "^3.5.1",
    "@material-ui/icons": "^3.0.1",
    "ajv": "^6.5.4",
    "bootstrap": "^4.1.3",
    "chart.js": "^2.7.3",
    "google-maps-react": "^2.0.2",
    "jquery": "^3.3.1",
    "react": "^16.5.2",
    "react-addons-css-transition-group": "^15.6.2",
    "react-bootstrap": "^0.32.4",
    "react-center": "^1.1.1",
    "react-chartjs-2": "^2.7.4",
    "react-dom": "^16.6.0",
    "react-google-maps": "^9.4.5",
    "react-infinite-calendar": "^2.3.1",
    "react-router-dom": "^4.3.1",
    "react-scripts": "^2.1.1",
    "react-stars": "^2.2.5",
    "react-table": "^6.8.6",
    "react-toolbox": "^2.0.0-beta.13",
    "react-web-tabs": "^1.0.1",
    "write-json-file": "^3.0.2"
}
```
## 2. Functionality for Campaign Managers

### 2.1 Create, View and Edit Campaigns
Create campaigns and view and edit data associated with them.  This data includes:

- Managers: Set of users who can edit data for this campaign.  these users must have the campaign manager role.  initially, this set contains the campaign's creator.

- Dates: A contiguous range of dates

- Talking Points: Text describing what the canvasser should say during visits

- Questionnaire: A list of yes/no questions specific to the campaign.  Examples: Did you hear of our product before?  Do you plan to vote in the next election?

- Visit Duration: Expected average duration of a visit to a location

- Locations: Set of addresses to visit, and results from the visit to each location.  the system can display this data as a list of addresses or as a map with a marker at each location.

- Canvassers: set of canvassers selected to work on this campaign.

Locations are added to a campaign by entering text in a textbox.  the text contains one address per line, in the following format: `NUMBER`, `STREET`, `UNIT`, `CITY`, `STATE`, `ZIP`.  
> :nerd: Example: 40, Piedmont Drive, Apartment 16B, Brookhaven, NY, 11776.
> :nerd: The system should allow at least 100 addresses to be uploaded at a time.

> :nerd: All above information about a campaign can be edited before, but not after, the campaign starts.  other information associated with a campaign (namely, canvassing assignment and results) is discussed below.

### 2.2 Create Canvassing Assignment
A "task" is a set of locations to be visited by one canvasser on one day, with a recommended order for the visits.   for a selected campaign, the system partitions the locations into tasks and assigns one task to each canvasser on each day that the canvasser will work on the campaign.  the number of created tasks should be the minimum (or close to it) such that the duration of the longest task is less than or equal to the work-day duration (a global parameter).  the system then assigns the tasks to days and canvassers, packing the tasks towards the beginning of the campaign.  for example, if two canvassers are selected to work on a 2-day campaign with 3 tasks, and both canvassers are available on both days, then both canvassers will be assigned tasks on the first day, and only one of them will be assigned a task on the second day.  if some tasks remain unassigned (because there are not enough canvassers or days), the system displays a detailed warning message, but keeps the canvassing assignment anyway.  the campaign manager can later edit the campaign to address this issue, if desired.

a canvasser can be assigned a task on a given day only if he/she is available (i.e., planning to work) on that day and unassigned (i.e., not already assigned a task in any campaign) on that day.  for simplicity, the system does not support assigning multiple tasks per day to a canvasser.

If the dates, canvassers, or locations for a campaign are modified, the system updates or discards any previously computed canvassing assignment for it.

### 2.3 View Canvassing Assignment
The canvassing assignment for a selected campaign is displayed in a table showing the date, canvasser, number of locations, and duration of each task.  The user can select a task to see additional details, including the set of locations in that task.  the user can choose whether to see the locations as a list of addresses in the recommended order or as markers on a map.

### 2.4 View Campaign Results
The system supports the following three views:
1. Table of detailed results, showing all information from all locations.
2. Statistical summary of results, including average and standard deviation of the ratings, and percentages of "yes" and "no" answers for each question in the questionnaire.
3. Visual summary of results in the form of a map with a marker for each location in the campaign, such that the color and/or shape of the markers indicate the rating of each location or that the location lacks a rating.

## 3. Functionality for Canvassers

### 3.1 Edit Availability
i.e., dates on which the canvasser is available for work.  This can be done conveniently, e.g., by clicking on dates on a calendar.

### 3.2 View Upcoming Canvassing Assignments
Select a canvassing assignment from the list to see details, including a map with markers at the locations assigned to this user, and a list of the addresses of those locations.

### 3.3 Canvass
The system loads the current day's canvassing assignment and displays the address of the next location to visit and a map with a marker at that location.  the system initially displays the next location to visit in the recommended order.  the canvasser is not required to follow the recommended order and can manually change the next location by selecting it from a list of unvisited locations.  the system displays detailed travel directions from the most recently visited location to the next location.

After visiting a location, the canvasser enters the results.  The results include: 
1. Whether the canvasser spoke to anyone.
2. A rating of how successful the visit was (e.g., how likely the person at that location is to vote for the candidate, buy the product, or contribute to the organization) on a scale of 0 to 5 stars.
3. Answers to the questionnaire (some questions might be unanswered).
4. Brief notes.  If that location was visited out-of-order, the system computes a new recommended order in which to visit the remaining (unvisited) locations.

## 4. Functionality for System Administrators

### 4.1 Edits Users
Add and remove users, and edit the set of roles granted to each user.  Any subset of the three roles can be granted to any user.  
> :nerd: Note: you can manually insert some initial users in the user database.  Subsequent users are added using the system's GUI.

### 4.2 Edit Global Parameters
Global parameters include the duration of a work day (this is a limit on the maximum duration of a task) and the average speed of a canvasser traveling between locations.

## 5. Other Requirements

### 5.1 Authentication
All access to the system requires authentication with a password.

### 5.2 Network Security
Communication is secured using HTTPS or SSL.  If your server does not have a public-key certificate signed by a certification authority trusted by your browser, your web browser will show a security warning.  You could work around this by creating a self-signed certificate, and installing the key in the browser, but that is optional.  Telling the browser to proceed despite the security warning is acceptable.

### 5.3 Concurrency
Synchronization should be used to ensure correct behavior when multiple users access the system concurrently.

### 5.4 Multi-Host Operation
The client and server can run on different hosts.

### 5.5 User Interface
Campaign managers and system administrators users access the system through a web interface.  For canvassers, the system provides one of the following: a web interface designed to be usable on the screen of a mobile device (e.g., tablet) or a mobile app.

## Notes

- Canvassing Assignment: You are encouraged to reduce the problem of computing a canvassing assignment to a known optimization problem and use an existing algorithm for that problem.  Designing an ad-hoc algorithm yourself will probably lead to worse results.  hw3-design must describe in detail your team's proposed approach to computing the canvassing assignment.

- Addresses: A possible source of real addresses to use when testing is 
https://results.openaddresses.io/

- Geocoding: Geocoding services return the latitude and longitude of an address (needed to mark the location on a map).  Here are some services to consider; let me know if you find better ones.
https://www.census.gov/geo/maps-data/data/geocoder.html  (free)
https://wiki.openstreetmap.org/wiki/Nominatim (free)
https://developers.google.com/maps/documentation/geocoding/start
  (inexpensive, e.g., $5 for 1000 requests)

- Mapping Library:  A popular mapping library to consider is https://leafletjs.com/
