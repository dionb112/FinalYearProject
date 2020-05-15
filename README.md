# FinalYearProject
React native application for Erasmus+ Coeliac Health App

Run 'npm install'

Then 'npm start'

This will run 'expo start' for you and prompt the expo-cli global install if you are missing it

If this fails update npm to latest version 'npm i npm@latest'

______________________________________________________________________

Also, navigate to Server folder from root

Run 'python server.py' (requires Python 2 and various pip installs)

To really test the quiz you will need to set the values on this file to "app run" from your external IP

(or simply set this to localhost if you are not booting from expo-cli as that needs to use localhost itself)

Finally you will also need to change the values in QuizScreen where it calls the api to match this IP
