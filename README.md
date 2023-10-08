# Magazine Subscription Management System

## Overview

The Magazine Subscription Management System is a Node.js project that allows users to manage magazine subscriptions and view their subscription history. The system consists of two primary components: "magazines" and "magazines_log." Users can perform various actions within the system:


## Installation Steps
1. Clone this repository or download .zip file.
2. Create new database on your MySQL Server.
3. Import `digital_magazines.sql`
4. Install node module by run ``npm install`` on your console.
7. Execute ``npm run start`` to run this app. It will run on port 3030.
8. When this app is running you can navigate to this link to test the APIs http://localhost/your_project_directory/dashboard.html.



## Features

### Add Magazines

Users can add new magazines to the system, providing essential details such as title, content, and subscription status.

### Delete Magazines

Magazines can be removed from the system when they are no longer needed.

### Subscribe or Unsubscribe

Users have the flexibility to subscribe to or unsubscribe from magazines, enabling them to receive or stop receiving updates.

### View Subscription History

The system maintains a comprehensive log of subscription and unsubscription events in the "magazines_log." Users can access this log to view their subscription history, including when they subscribed or unsubscribed from specific magazines.

This Magazine Subscription Management System simplifies the process of managing magazine subscriptions, offering users control over their subscriptions and transparency in the subscription history. It's a user-friendly solution for efficient magazine subscription management.

## Magazine Subscription Management API Documentation

This API provides functionality for managing magazine subscriptions, including adding, deleting, updating, and retrieving magazine details. It also offers subscription history and status management.

### Table of Contents

1. [List Magazines](#1-list-magazines)
2. [Add Magazine](#2-add-magazine)
3. [Retrieve Magazine Details](#3-retrieve-magazine-details)
4. [Update Magazine](#4-update-magazine)
5. [Delete Magazine](#5-delete-magazine)

---

### 1. List Magazines

- **Endpoint**: `/magazines`
- **HTTP Method**: GET
- **Description**: Get a list of magazines, including their details.
- **Response**: JSON containing an array of magazine objects.

---

### 2. Add Magazine

- **Endpoint**: `/magazines`
- **HTTP Method**: POST
- **Description**: Add a new magazine to the system.
- **Request Body**: JSON object containing magazine details.
- **Response**: JSON indicating success or error.

Example Request Body:
```json
{
  "title": "Sample Magazine",
  "description": "A sample magazine description.",
  "monthly_price": 9.99
}
```

---

### 3. Retrieve Magazine Details

- **Endpoint**: `/magazines/{id}`
- **HTTP Method**: GET
- **Description**: Retrieve details of a specific magazine by its ID.
- **Response**: JSON containing the magazine's details.

---

### 4. Update Magazine

- **Endpoint**: `/magazines/{id}`
- **HTTP Method**: PUT
- **Description**: Update details of a specific magazine by its ID.
- **Request Body**: JSON object containing the fields to be updated.
- **Response**: JSON indicating success or error.

Example Request Body:
```json
{
  "title": "Updated Magazine Title",
  "monthly_price": 12.99
}
```

---

### 5. Delete Magazine

- **Endpoint**: `/magazines/{id}`
- **HTTP Method**: DELETE
- **Description**: Delete a specific magazine by its ID.
- **Response**: JSON indicating success or error.
