pipeline {
    agent any

    stages {
        stage('Build TaskManager-UI Application') {
            steps {
                echo 'Building TaskManager-UI...'
                bat 'cd TaskManager-UI && npm i && npm run-script build'
            }
        }
        stage('Build TaskManager-Backend Application') {
            steps {
                echo 'Building TaskManager-Backend..'
                bat 'cd TaskManager-Backend && npm i && npm run build'
            }
        }
        stage('Test Frontend Application') {
            steps {
                echo 'Testing Frontend...'
                bat 'cd TaskManager-UI && npm i && npm test'
            }
        }
        stage('Test TaskManager-Backend') {
            steps {
                echo 'Testing Backend..'
                bat 'cd TaskManager-Backend && npm i && npm test'
            }
        }
        stage('Deploy Application') {
            steps {
                echo 'Deploying application'
                // bat 'docker-compose up --build -d'
            }
        }
    }
}