# Capstone_Project
LocalSquare is an application aimed at improving the physical connectedness and participation of communities and groups. It allows users to create and manage groups and create a group layout to suit the group's individual needs. LocalSquare aspires to be a place where community members can connect, find information, and get involved in their local groups and communities.

There are no good social media platforms focused on creating healthy and unique environments for physical communities to connect. There are many problems with the current solutions people use:
1. They are not aimed at physical communities, and so don't have the functionalities a physical community would want.
2. They are swamped with ads or irrelevant content, which makes it hard to find the information you want.
3. They make money by keeping your attention, and so end up hooking users and wasting a lot of their time.
4. They have limited functionalities and limited customization.

LocalSquare aims to solve many of these issues with a non-aggressive business model, healthy application design, a ton of functionalities aimed at facilitating physical communities, and dynamic groups that can be created to suit the communities they are for.

**Installation Instructions**
To install an instance of LocalSquare on your own machine, follow these steps:
1. Clone the latest version of LocalSquare from github: `git clone https://github.com/CitizenThreee/Capstone_Project.git`
2. Run `npm install` in the frontend, backend, and optionally test folders
3. Make sure you have mongodb installed
4. In the backend folder, create a .env file
5. Paste the following into the .env file:
```javascript
DB_URI= mongodb://localhost:27017/localSquare
PORT= 8080
```
5. Replace the database uri with your mongodb's uri
6. In the frontend run `npm run dev`
7. In the backend run `npm start`
8. Open the application in your browser at 'http://localhost:3003'

**Testing Instructions**
To run the tests, follow these steps:
1. Make sure you have run `npm install` in the tests folder
2. For the endpoint tests, read the comments to find where you have to insert real data
3. Run `npm test`
