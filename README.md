# express-app-note
Note taking app - learning express
This is a mini project to learn the concepts of express and get some familiarity __MONGO__ and elasticsearch.

# Requirements
This program requires mongo-db to be preinstalled and running as a background service.
Also Install the elastic search also for querying purpose and it should be also running
If you haven't them try to install it from official documemntation, it will really help.
```sh
sudo service mongod start
```

This will start mongo as a background service.
Them create a database for the app (in mongo shell) :
```sh
mongo
use note_app
```

Now your database is up and ready to fire.
Install the node and its dependencies, from command
```sh
npm install
```

This will install all the necessary dependencies in the package.json file and store them in 
the node_modules in your directory.
For kickstarting the code, execute the following command
```sh
npm start
```

This will run the server locally on port [3000](http://localhost:3000/).
Now create a user from signup method and voila use the app.

## Contributors
+ yashLadha
