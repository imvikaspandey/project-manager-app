### Project Manager


The source code is located at Desktop in VM under the folder `C:\Users\Admin\Desktop\FinalAssesment\project-manager-app`

#### Without Docker -

#### To set up backend -

Change to `TaskManager-Backend` directory and run the below commands -

(Make sure that MongoDb server is up and running)
1. `npm install`
2. `node index.js`

#### To set up frontend -

Change to `TaskManager-UI` directory and run the below commands -

1. `npm install`
2. `npm start`
3. The application can be accessed at http://localhost:4200

#### With Docker -

(Make sure that docker is running)

`docker-compose up --build`

After starting the containers, the application will be available at http://localhost

#### Code coverage
Code coverage screenshots are present in `TaskManager-Backend` and `TaskManager-UI` directories.

#### Jenkins job pipeline screenshot
C:\Users\Admin\Desktop\FinalAssesment\project-manager-app\Jenkins-build-img.png

#### GIT Repo for capsule-

- https://github.com/imvikaspandey/project-manager-app