### Project Manager


The source code is located at Desktop in VM under the folder `C:\Users\Admin\Desktop\capsule\project-manager-app`

#### Without Docker -

#### To set up backend -

Change to `Backend` directory and run the below commands -

(Make sure that MongoDb server is up and running)
1. `npm install`
2. `node index.js`

#### To set up frontend -

Change to `Frontend` directory and run the below commands -

1. `npm install`
2. `npm start`
3. The application can be accessed at http://localhost:4200

#### With Docker -

(Make sure that docker is running)

`docker-compose up --build`

After starting the containers, the application will be available at http://localhost

#### GIT Repo for capsule-

- https://github.com/imvikaspandey/project-manager-app/tree/capsule