# API Routes Documentation

## Get Current User Details

Returns the information about the current user that is logged in.

* **Require Authentication:** false
* **Request**
  * **Method:** GET
  * **Route path:** `/api/session`
  * **Body:** none

* **Successful Response when there is a logged-in user**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "profile_picture": "fake_url.jpg",
        "created_at": "timestanmp",
        "updated_at": "timestamp",
        "score": 2300,
        "streak": 5,
        "badges": [
          { // badge key is returned only if the program has a corresponding badge
            "id": 1,
            "name": "Iron Will",
            "description": "Completed 75 Strong.",
            "icon_url": "https://habito-images.s3.us-east-2.amazonaws.com/75hard-logo.jpg.jpg"
          },
          { // badge key is returned only if the program has a corresponding badge
            "id": 2,
            "name": "Iron Bill",
            "description": "Completed 75 Soft.",
            "icon_url": "https://habito-images.s3.us-east-2.amazonaws.com/75hard-lsoft.jpg.jpg"
          }
        ]
      }
    }
    ```

* **Successful Response when no user is logged in**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "user": null
    }
    ```

---

## Get All Programs

Returns all available programs with their details.

* **Require Authentication:** false
* **Request**
  * **Method:** GET
  * **Route path:** `/api/programs`
  * **Body:** none

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "all_programs": [
        {
          "id": 1,
          "creator_id": 2,
          "name": "75 hard",
          "description": "75-day mental toughness program that challenges participants to follow a strict regimen without exception.",
          "total_days": 75,
          "badge": { // badge key is returned only if the program has a corresponding badge
            "id": 1,
            "name": "Iron Will",
            "description": "Completed 75 Strong.",
            "icon_url": "https://habito-images.s3.us-east-2.amazonaws.com/75hard-logo.jpg.jpg"
          },
          "tasks": [
            {
              "id": 3,
              "name": "drink aqua"
            },
            {
              "id": 4,
              "name": "read 5 pages of a book"
            }
          ]
        },
        {
          "id": 2,
          "creator_id": null,
          "name": "30 soft",
          "description": "diet, exercise and read",
          "total_days": 30,
          "tasks": [
            {
              "id": 7,
              "name": "run for 30 mins"
            },
            {
              "id": 9,
              "name": "don't smoke"
            }
          ]
        }
      ]
    }
    ```

## Get Current User's Programs/Daily Tasks

Returns the programs and daily tasks for the current user.

* **Require Authentication:** true
* **Request**
  * **Method:** GET
  * **Route path:** `/api/userprograms/current`
  * **Body:** none

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "user_programs": [
        {
          "id": 1,
          "program_id": 3,
          "creator_id": 2,
          "name": "75 hard",
          "description": "75-day mental toughness program that challenges participants to follow a strict regimen without exception.",
          "total_days": 75,
          "days_left": 32,
          "tasks": [
            {
              "task_id": 1,
              "user_task_id": 3,
              "name": "drink aqua",
              "is_completed": false
            },
            {
              "task_id": 1,
              "user_task_id": 3,
              "name": "read 5 pages of a book",
              "is_completed": true
            }
          ]
        },
        {
          "id": 2,
          "program_id": 2,
          "creator_id": null,
          "name": "30 soft",
          "description": "diet, exercise and read",
          "total_days": 30,
          "days_left": 5,
          "tasks": [
            {
              "task_id": 1,
              "user_task_id": 3,
              "name": "run for 30 mins",
              "is_completed": false
            },
            {
              "task_id": 1,
              "user_task_id": 3,
              "name": "don't smoke",
              "is_completed": true
            }
          ]
        }
      ]
    }
    ```

---

## Create a Program

Creates a new program with the specified details.

* **Require Authentication:** true
* **Request**
  * **Method:** POST
  * **Route path:** `/api/programs`
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "name": "75 hard",
      "description": "75-day mental toughness program that challenges participants to follow a strict regimen without exception.",
      "total_days": 75,
      "enroll": true, // if the user that created it wants to enroll
      "tasks": [
        {
          "name": "drink aqua"
        },
        {
          "name": "read 5 pages of a book"
        }
      ]
    }
    ```

* **Successful Response**
  * **Status Code:** 201
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "id": 1,
      "creator_id": 1,
      "is_enrolled": true, // if user is enrolled in program
      "name": "75 hard",
      "description": "75-day mental toughness program that challenges participants to follow a strict regimen without exception.",
      "total_days": 75,
      "days_left": 33,
      "tasks": [
        {
          "id": 3,
          "name": "drink aqua"
        },
        {
          "id": 4,
          "name": "read 5 pages of a book"
        }
      ]
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

---

## Add a Program to User's Programs

Adds an existing program to the user's list of programs.

* **Require Authentication:** true
* **Request**
  * **Method:** POST
  * **Route path:** `/api/userprograms/:programId`
  * **Body:** none

* **Successful Response**
  * **Status Code:** 201
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "successfully created"
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

* **Error Response: Already enrolled**
  * **Status Code:** 409
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "Already enrolled"
    }
    ```

---

## Delete a Program from User's Programs

Deletes a program from the user's list of programs by the user_program.id, but if <?by_program_id=true> is provided it deletes the user_program instance by its pragram_id column

* **Require Authentication:** true
* **Request**
  * **Method:** DELETE
  * **Route path:** `/api/userprograms/:userprogramId<?by_program_id=true>--optional`
  * **Body:** none

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "successfully deleted"
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

## Update a Program

Updates a program's details if the user is the creator of the program.

* **Require Authentication:** true
* **Request**
  * **Method:** PATCH
  * **Route path:** `/api/programs/:programId`
  * **Headers:**
    * Content-Type: application/json
  * **Body:** Include only the fields that need updating

    ```json
    {
      "name": "new name",
      "description": "this is the new desc",
      "total_days": 23
    }
    ```

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "successfully updated"
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

* **Error Response: Unauthorized**
  * **Status Code:** 403
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "Authorization required"
    }
    ```

---

## Get a Program's Details

Returns the details of a specific program.

* **Require Authentication:** false
* **Request**
  * **Method:** GET
  * **Route path:** `/api/programs/:programId`
  * **Body:** none

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "id": 1,
      "creator_id": null,
      "is_enrolled": false, // if user is enrolled in program
      "name": "75 hard",
      "description": "75-day mental toughness program that challenges participants to follow a strict regimen without exception.",
      "total_days": 75,
      "days_left": 33,
      "badge": { // badge key is returned only if the program has a corresponding badge
            "id": 1,
            "name": "Iron Will",
            "description": "Completed 75 Strong.",
            "icon_url": "https://habito-images.s3.us-east-2.amazonaws.com/75hard-logo.jpg.jpg"
          },
      "tasks": [
        {
          "id": 3,
          "name": "drink aqua"
        },
        {
          "id": 4,
          "name": "read 5 pages of a book"
        }
      ]
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

---

## Add a Task to a Program

Adds a new task to a program. Only the creator of the program can add tasks.

* **Require Authentication:** true
* **Request**
  * **Method:** POST
  * **Route path:** `/api/programs/:programId/tasks`
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "name": "run for 30 mins"
    }
    ```

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "id": 5,
      "name": "run for 30 mins"
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

* **Error Response: Unauthorized**
  * **Status Code:** 403
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "Authorization required"
    }
    ```

---

## Delete a Task from a Program

Deletes a task from a program. Only the creator of the program can delete tasks.

* **Require Authentication:** true
* **Request**
  * **Method:** DELETE
  * **Route path:** `/api/programs/:programId/tasks/:taskId`
  * **Headers:**
    * Content-Type: application/json
  * **Body:** none

* **Successful Response**
  * **Status Code:** 200
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "succefully deleted"
    }
    ```

* **Error Response: Program Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "program not found"
    }
    ```

* **Error Response: Task Not Found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "task not found"
    }
    ```

* **Error Response: Unauthorized**
  * **Status Code:** 403
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "Authorization required"
    }
    ```

---

## Update User Task(s)

toggles the is_completed column of a user_task.

* **Require Authentication:** true
* **Request**
  * **Method:** PATCH
  * **Route path:** `/api/usertasks/:taskId`
  * **Body:** none

* **Successful Response**
  * **Status Code:** 201
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "successfully updated"
    }
    ```

* **Response when task is not found**
  * **Status Code:** 404
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "task not found"
    }
    ```

* **Response when task is not the current user's**
  * **Status Code:** 401
  * **Headers:**
    * Content-Type: application/json
  * **Body:**

    ```json
    {
      "message": "Authorization required"
    }
    ```


