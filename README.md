URL Shortener Application
The URL Shortener is a full-stack application designed to create shorter aliases for long URLs. It allows users to easily manage and share links with convenient, memorable short URLs. This document provides an overview of the application, including its architecture, setup instructions, usage, and deployment.

Application Overview
The application consists of two main components:

Server (Backend): A Node.js server built with Express.js, responsible for handling API requests to shorten URLs, redirecting short URLs to their original destinations, and managing URL data in a MongoDB database.
Client (Frontend): A React application that provides a user interface for submitting URLs to be shortened, displaying the shortened result, and optionally allowing users to specify custom slugs.
Features
URL Shortening: Convert long URLs into short, manageable links that redirect to the original URL.
Custom Slugs: Users can specify custom slugs for their URLs for more personalized and meaningful short links.
Visit Tracking: The application tracks visits to each short URL, providing basic analytics on link usage.

Prerequisites
Node.js (version 16 or newer)
MongoDB (local or cloud-based)
Docker and Docker Compose (for containerized deployment)
Local Development Setup
Server Setup
Navigate to the server directory.
Install dependencies with npm install.
Ensure MongoDB is running.
Start the server with npm start.

Client Setup
Navigate to the client directory.
Install dependencies with npm install.
Start the React development server with npm start. The application should open in your default web browser.
Building and Running with Docker
Building Docker Images
Server: From the root of the server directory, run:
bash
Copy code
docker build -t url-shortener-server .
Client: From the root of the client directory, run:
bash
Copy code
docker build -t url-shortener-client .
Running Containers
Server:
bash
Copy code
docker run -p 3000:3000 url-shortener-server
Client:
bash
Copy code
docker run -p 8000:8000 url-shortener-client
Usage
Shortening a URL
Navigate to the client application in your web browser.
Enter the URL you wish to shorten in the input field.
(Optional) Specify a custom slug for your URL.
Submit the form to receive your shortened URL.
Accessing a Shortened URL
Enter the shortened URL in your web browser's address bar. You will be redirected to the original URL associated with the shortened link.
For now please use CURL
