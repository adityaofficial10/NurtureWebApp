## Setup Instructions:

1. Clone this repository on your system.  
2. Create a new file in the server/config directory named .env and add the following:
   PORT = whatever port you want (4000)
   MONGO_DATABASE_NAME = the DB you want
   ATLAS_USERNAME = 
   ATLAS_PASSWORD = 
   EMAIL = (host email for sending notifications)
   PASSWORD = (host email password)
3. Check if node and npm are installed on your system.
4. Ensure that you have a mongoDB server running on your system and connect it to the mongoDB ATLAS using the credentials..
4. Run npm install from the server directory of the project.
5. Run npm run server from your command line and the server starts on your specified port.

The frontend code is stored in the client directory.
