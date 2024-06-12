pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'rohitrambade' 
        IMAGE_TAG = "v2" 
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop', url: 'https://github.com/rohit-rambade/student-housing-finder.git'
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    sh '''
                    cd client 
                    sudo docker build -t ${DOCKER_REGISTRY}/shf-frontend:${IMAGE_TAG} .
                    '''
                }
            }
        }
        
        stage('Build Backend Image') {
            steps {
                script {
                    sh '''
                    cd server 
                    sudo docker build -t ${DOCKER_REGISTRY}/shf-backend:${IMAGE_TAG} .
                    '''
                }
            }
        }
        
        stage('Push To DockerHUB') {
            steps {
                script {
                   
                  withCredentials([usernamePassword(credentialsId: 'docker-hub-acc', passwordVariable: 'PASS', usernameVariable: 'USERNAME')]) {
      sh '''
     echo $PASS | docker login -u $USERNAME --password-stdin
      sudo docker push $DOCKER_REGISTRY/shf-frontend:$IMAGE_TAG
      sudo docker push $DOCKER_REGISTRY/shf-backend:$IMAGE_TAG
      
      
      '''
}
                   
                }
            }
        }

    }

    post {
        always {
            cleanWs()
        }
    }
}
