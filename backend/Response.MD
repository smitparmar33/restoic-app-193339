
** Authorization **

    * Registration POST * https://restoic-app-19339.botics.co/rest-auth/registration/

        Error - 400 Bad Request

            {
                "email": [
                    "This field is required."
                ],
                "password": [
                    "This field is required."
                ]
            }

            -------------------

            {
                "email": [
                    "user with this email address already exists."
                ]
            }
        
        Success - 200 OK

            {
                "key": "65808bf6afdb1e5f44c7acfe0830d769424c0d7e"
            }

    
    * Login POST * https://restoic-app-19339.botics.co/rest-auth/login/

        Error - 400 Bad Request

            {
                "password": [
                    "This field is required."
                ]
            }

            ---------------------

            {
                "non_field_errors": [
                    "Unable to log in with provided credentials."
                ]
            }


        Success - 200 OK

            {
                "key": "65808bf6afdb1e5f44c7acfe0830d769424c0d7e"
            }

    * User GET/PATCH * https://restoic-app-19339.botics.co/rest-auth/user/

        Error - 401 Unauthorize

            {
                "detail": "Authentication credentials were not provided."
            }

        Success - 200 OK

            {
                "id": 6,
                "first_name": "",
                "last_name": "",
                "email": "test@wat.com",
                "image": "https://restoic-app-19339.s3.amazonaws.com/media/default.jpg",
                "sport": "0",
                "competition": "0"
            }
        
    * ChangePassword POST * 

        Error - 401 Unauthorize

            {
                "detail": "Authentication credentials were not provided."
            }

        Error - 400 Bad Request

            {
                "new_password1": [
                    "This field is required."
                ],
                "new_password2": [
                    "This field is required."
                ]
            }

            -------------------------------

            {
                "new_password2": [
                    "The two password fields didn't match."
                ]
            }

        Success - 200 OK

            {
                "detail": "New password has been saved."
            }


** CATEGORIES **

    * Categories List GET *  https://restoic-app-19339.botics.co/api/v1/categories/

        Success - 200 OK

            [
                {
                    "id": 1,
                    "title": "Test Category 1",
                    "thumbnail": "https://restoic-app-19339.s3.amazonaws.com/media/category/thumbnail/abstract-background-284.jpg",
                    "tracks_in_category": [
                        {
                            "track": {
                                "id": 1,
                                "title": "Test Title Track",
                                "subtitle": "Test Subtitle Track",
                                "track": "https://restoic-app-19339.s3.amazonaws.com/media/tracks/rings-of-saturn.wav",
                                "thumbnail": "https://restoic-app-19339.s3.amazonaws.com/media/thumbnail/images.jpg",
                                "track_duration": 103.0,
                                "intro_duration": 23.0,
                                "created": "2020-10-10T07:43:52.610240Z"
                            }
                        }
                    ]
                }
            ]

    * Category GET * https://restoic-app-19339.botics.co/api/v1/categories/1/

        Success - 200 OK

            {
                "id": 1,
                "title": "Test Category 1",
                "thumbnail": "https://restoic-app-19339.s3.amazonaws.com/media/category/thumbnail/abstract-background-284.jpg",
                "tracks_in_category": [
                    {
                        "track": {
                            "id": 1,
                            "title": "Test Title Track",
                            "subtitle": "Test Subtitle Track",
                            "track": "https://restoic-app-19339.s3.amazonaws.com/media/tracks/rings-of-saturn.wav",
                            "thumbnail": "https://restoic-app-19339.s3.amazonaws.com/media/thumbnail/images.jpg",
                            "track_duration": 103.0,
                            "intro_duration": 23.0,
                            "created": "2020-10-10T07:43:52.610240Z"
                        }
                    }
                ]
            }
        

** AUDIO PLAYER **

    * Audio Player Track GET * https://restoic-app-19339.botics.co/api/v1/audio-player/1/

        Success - 200 OK

            {
                "track": {
                    "id": 1,
                    "title": "Test Title Track",
                    "subtitle": "Test Subtitle Track",
                    "track": "https://restoic-app-19339.s3.amazonaws.com/media/tracks/rings-of-saturn.wav",
                    "track_duration": 103.0,
                    "intro_duration": 23.0,
                    "created": "2020-10-10T07:43:52.610240Z"
                },
                "history": [
                    {
                        "id": 1,
                        "is_finished": false,
                        "stopped_at": null,
                        "user": 6
                    }
                ],
                 "favorite": [
                    {
                        "id": 1,
                        "user": 6
                    }
                ]
            }


    * Add to History POST * https://restoic-app-19339.botics.co/api/v1/history/

            
        Error - 400 Bad Request

            {
                "track": [
                    "This field is required."
                ]
            }
            
            ------------------------------

            {
                "track": [
                    "Invalid pk \"2525\" - object does not exist."
                ]
            }

        Success - 200 OK

            {
                "id": 1,
                "is_finished": false,
                "stopped_at": null,
                "created": "2020-10-12T12:10:21.007513Z",
                "track": 1
            }

    * Patch To History PATCH * https://restoic-app-19339.botics.co/api/v1/history/1/

        Success - 200 OK

            {
                "id": 1,
                "is_finished": false,
                "stopped_at": 1.0,
                "created": "2020-10-12T12:13:50.183237Z",
                "track": 1
            }

    
     * Add to Favorites POST * https://restoic-app-19339.botics.co/api/v1/favorites/

            
        Error - 400 Bad Request

            {
                "track": [
                    "This field is required."
                ]
            }
            
            ------------------------------

            {
                "track": [
                    "Invalid pk \"2525\" - object does not exist."
                ]
            }

        Success - 200 OK

            {
                "id": 1
                "track": 1
            }

    * Delete from Favorites DELETE * https://restoic-app-19339.botics.co/api/v1/favorites/1/

        204 No Content

        
