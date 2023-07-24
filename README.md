# Parenting Advice Chatbot Documentation

This documentation provides an overview of the Parenting Advice Chatbot Angular project. The project consists of a web application that allows users to interact with a chatbot to receive parenting advice. Users can log in or sign up to access the chat functionality.

#### Backend documentation
https://github.com/chetandabli/python_assignments/blob/main/cosmos_backend

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Components](#components)
6. [Services](#services)
7. [Routes](#routes)
8. [API Endpoints](#api-endpoints)

## 1. Introduction

The Parenting Advice Chatbot is a web application built using Angular. It provides a chat interface where users can interact with the chatbot to seek parenting advice. The application has an authentication system that allows users to log in or sign up to access the chat functionality. Once authenticated, users can view their chat history, create new chat threads, and continue existing conversations.

## 2. Installation

To run the Parenting Advice Chatbot locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using the following command:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

## 3. Project Structure

The project is organized into various directories, each serving a specific purpose:

- `src/app`: Contains all the components, services, and other related files of the application.
- `src/app/components`: Contains the different components of the application.
- `src/app/services`: Contains the services used for handling API calls and other shared functionalities.
- `src/app/app.module.ts`: The main module that defines the application's components, imports, providers, and bootstraps.

## 4. Usage

To use the Parenting Advice Chatbot, follow these steps:

1. Open the application in your browser.
2. If not already logged in, you will be redirected to the `/auth` page, where you can either log in or sign up.
3. After logging in, you will be redirected to the `/chat` page, which displays the chat interface.
4. The chat page consists of a navigation bar with a logout button, a list of all chats on the left side, and the chat history on the right side.
5. To create a new chat, click the "Create new chat" button on the left sidebar. This will start a new chat thread.
6. To continue an existing chat, click on the chat thread from the left sidebar, and the chat history for that chat will be displayed on the right side.
7. Enter your message in the input box at the bottom and click "Send" to send your question to the chatbot.
8. The chatbot will respond with parenting advice, and the conversation will be displayed in the chat history.

## 5. Components

The application is composed of the following components:

- `AppComponent`: The root component of the application.
- `AuthComponent`: Responsible for login and signup functionality.
- `LoginComponent`: Displayed within the `AuthComponent` for user login.
- `SignupComponent`: Displayed within the `AuthComponent` for user signup.
- `ChatComponent`: The main chat interface where users can interact with the chatbot.
- `AdminLoginPageComponent`: A separate login page for administrators (work in progress).
- `AdminDashboardComponent`: A separate dashboard for administrators (work in progress).

## 6. Services

The application uses the following service:

- `AppService`: A shared service responsible for managing user authentication, handling API calls, and storing the chat history.

## 7. Routes

The application has the following routes:

- `/auth`: The authentication page, displaying the `AuthComponent` with options for login and signup.
- `/chat`: The chat page, displaying the `ChatComponent`. Users must be logged in to access this page.
- `/admin-login`: A separate login page for administrators.
- `/admin-dashboard`: A separate dashboard for administrators.
- All other routes redirect to `/chat` by default.

## 8. API Endpoints

The application interacts with the following API endpoints:

- `GET /user/chat_history`: Fetches the chat history for the logged-in user.
- `POST /user/question`: Sends a user's question to the chatbot for processing.

Note: The actual API endpoints and their functionalities are not included in the provided code and need to be implemented separately to make the chatbot fully functional.

This documentation provides an overview of the Parenting Advice Chatbot project. To make the application fully functional, you need to implement the missing parts, such as the authentication system, API endpoints, and chatbot logic, based on the project requirements.
