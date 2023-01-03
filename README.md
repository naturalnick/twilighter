# Twilighter

<br>

_A full-stack web app that collects tweet data from Twitter's API on the server and hosts a local API for the client to call to retrieve that data._

<br>

See it in action [here](https://twilighter.herokuapp.com/).

<br>

Screenshot:<br>
<img src="./screenshot.png" width="85%">

## Details

### Server:

-  Python-based server using Flask framework
-  Accesses Twitter API v2
-  Collect and filter tweet data
-  Creates API endpoints for the client to call

### Client:

-  Made with Javascript, ReactJS and Bootstrap components
-  Features three main pages (Home, Search, and Random) and a "Not Found" page for 404 errors
-  **Search** allows tweet or keyword searching and sends a request with the query to the server API endpoints which returns that data to present as tweets
-  The **Random** button generates a random tweet based on criteria set by the server

## Skills Developed

-  Quickly learned Python from scratch to build the server
-  Making API requests to the Twitter API using authentication, headers, and queries
-  Communicating between server and client via API endpoints
-  Using React-Router library to implement pages for the front-end
-  Bootstrap continues to save me a lot of time with all the different components available
-  Error handling in Python and Javascript
-  The larger the project got the more it forced me to get organized for my own sanity

## Installation

### Client

    1. In /client/src/settings.js, change SERVER_URL to your host address or leave as localhost.
    2. At the command line in the root directory run 'cd client'.
    3. Then run 'npm install' to install node package manager.
    4. Run 'npm run build' to set up static files for server.

### Server

    1. At the command line in the root directory run 'cd server'
    2. Run 'python3 -m venv .venv' to create a virtual environment.
    3. Run 'source .venv/bin/activate' to activate virtual environment.
    4. Run 'pip install -m requirements.txt' to install required packages.

    5. Sign up for a free Twitter developer account to get codes that enable access to the Twitter API.
    5. In the root directory, add a file named ".env" and add two variables with the corresponding keys from your developer account.
    	__API_KEY__=YOUR KEY
    	__API_KEY_SECRET__=YOUR_KEY
    6. Back at the command line run 'python3 server.py'
     7. Server should now be online! Paste the url found in the terminal response to your browser to see Twilighter live!

## Author

-  **Nick Schaefer** - _Full-Stack Software Developer_ - [Website](https://www.nschaefer.com/) | [LinkedIn](https://www.linkedin.com/in/nick-n-schaefer)
