pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'rohitrambade'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop', url: 'https://github.com/rohit-rambade/student-housing-finder.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'sudo docker build -t ${DOCKER_REGISTRY}/shf-frontend:v${BUILD_NUMBER} .'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('server') {
                    sh 'sudo docker build -t ${DOCKER_REGISTRY}/shf-backend:v${BUILD_NUMBER} .'
                }
            }
        }

        stage('Push to DockerHUB') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        sh 'sudo docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}'
                        sh 'sudo docker push ${DOCKER_REGISTRY}/shf-frontend:v${BUILD_NUMBER} '
                        sh 'sudo docker push ${DOCKER_REGISTRY}/shf-backend:v${BUILD_NUMBER} '
                    }
                }
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'eks-secret', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                    sh 'kubectl apply -f k8s/ns.yml'
                    sh 'kubectl apply -f k8s/configMap.yml'
                    sh 'kubectl apply -f k8s/secret.yml'
                    sh 'envsubst < k8s/deployment.yml | kubectl apply -f -'
                    sh ' kubectl apply -f k8s/service.yml'
                }
            }
        }
    }
}
