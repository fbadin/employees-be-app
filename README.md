# Backend for Employee Dashboard Project

## Description

This is a personal project to demonstrate my skill set in Node.js, TypeScript, Express, Jest, and Docker. <br>
It serves as the backend for managing company employees.

---

## Demo

[![Video Thumbnail](https://www.buddyget.net/static/img/pictures/fd2f65ed-27be-4c81-b6ea-26143d9d7858.png)](https://drive.google.com/file/d/1GlakQxQeceKqIUCNpqrRZ6ppTRGjqa74/view?usp=sharing)

---

## Running the Project with Docker

Ensure you have a recent version of Docker and Docker Compose installed on your local machine, then run:

```sh
docker compose up
```

---

## Running the Project Locally

### Install Node.js Dependencies

Ensure you have a recent version of Node.js installed on your local machine, then run:

```sh
npm ci
```

### Run the Project

```sh
npm run dev
```

---

## Running Tests

```sh
npm run test
```

---

## Build for Production

```sh
N/A
```

This sample project is only available for local testing.

---

## Features Overview

- Implemented a backend in Node.js.
- Added TypeScript 5.4.
- Added Express 4.
- Added nodemon for hot-reload.
- Connected to a live MongoDB database for testing purposes, using Mongoose for modeling.
- Added Docker to encapsulate the environment, if desirable.
- Implemented nested RESTful routes at `/api/v1/employees` to index, show, create, update, and delete employees via HTTP actions.

---

