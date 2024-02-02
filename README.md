# Realpad Frontend (realpad-fe)

## Introduction
This frontend application is designed to display weather forecasts from the Realpad backend service. It showcases data for various cities and allows users to visualize weather information in a user-friendly interface.

## Prerequisites
Before running this project, make sure you have the following installed:
- Node.js (preferably the latest LTS version)
- npm or Yarn (as your package manager)
- Git (to clone the repository)

## Getting Started

### Cloning the Repository
To clone the repository and install dependencies, run the following commands:

```sh
git clone https://github.com/miskakubisova/realpad-fe.git
cd realpad-fe
npm install # Or `yarn install` if you are using Yarn
```

### Running the Application
To start the frontend application, execute:
```shell
npm run serve # Or `yarn serve` if you are using Yarn
```
This will compile and hot-reload the application for development. By default, the application will be available at http://localhost:8080.

### Interacting with the Backend Service
The frontend application is designed to interact with the Realpad backend service. Ensure the backend service is running and accessible at http://localhost:8090. The frontend makes requests to endpoints provided by the backend to retrieve and display weather data.

### Technologies Used
Vue.js 3