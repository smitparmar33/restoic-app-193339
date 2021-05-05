# Restoic APIs

### START Auth FLOW ###

*1.* **POST** | Registration 
	
* **Route** ``/rest-auth/registration/`` 
* **Body to send**	``email, password``

*2.* **POST** | Login
	
* **Route** ``/rest-auth/login/`` 
* **Body to send** ``email, password``
* **Response** ``key`` (token)

*3.* **GET** | Logged User Details

* **Route** ``/rest-auth/user/`` - Logged User Details
* **Response** ``id, first_name, last_name, email, image, sport, competition``

*4.* **PATCH** | Update Logged User Data

* **Route** ``/rest-auth/user/``
* **Body to send** ``first_name, last_name, image, sport, competition``

*5.* **POST** | Reset Password

* **Route** ``/rest-auth/password/reset/``
* **Body to send** ``email``

*6.* **POST** | Change Password

* **Route** ``/rest-auth/password/change/``
* **Body to send** ``new_password1, new_password2``

*7.* **SOCIAL** ``/rest-auth/facebook/`` & ``/rest-auth/google/``  POST ``access_token`` or ``code``

### END Auth Flow ###

### START Categories Flow ###

*1.* **GET** | Get all categories with tracks
* **Route** - ``/api/v1/categories/``
* **Response** 
`` id, title, thumbnail, tracks_in_category: [ track: { id, title, subtitle, track, thumbnail, track_duration, intro_duration, created } ]``

*2.* **GET** | Get category info with tracks inside
* **Route** - ``/api/v1/categories/<id>``
* **Response** 
`` id, title, thumbnail, tracks_in_category: [ track: { id, title, subtitle, track, thumbnail, track_duration, intro_duration, created } ]``

### END Categories Flow ###

### START Quick Links ###

*1.* **GET** | Get all Quick Links
* **Route** - ``/api/v1/quick-links/``
* **Response** 
`` id, title, subtitle, content, description, thumbnail, link, in_app (is link in app or not) ``

*2.* **GET** | Get Quick Link
* **Route** - ``/api/v1/quick-links/<id>/``
* **Response** 
`` id, title, subtitle, content, description, thumbnail, link, in_app (is link in app or not) ``

### END Quick Links ###

### START Audio Player Workflow

*1.* **GET** | Get track to play in audio player
* **Route** - ``/api/v1/audio-player/<track_id>/``
* **Response** 
`` track: { id, title, subtitle, track, thumbnail, duration_track, duration_intro, created },
history: [ { id, is_finished, stopped_at } ], favorite: [ { id } ]``

    1.1. **POST** | CASE: user has no record in history with that track (response will be ``history: null``)
    * **Route** - ``/api/v1/history/``
    * **Body to send:** ``track`` (track_id)  
    
    1.2 **PATCH** | CASE: user has record in history with that track
    * **Route** - ``/api/v1/history/<id>/``
    * **Param** - ``id`` history record id
    * **Body to send:** ``stopped_at`` (eg. every few seconds) OR ``is_finished`` (true) if user finished
    
    *1.3.* **POST** | CASE: track is not in favorites and user want to add it (response will be ``favorite: null``)
    * **Route** - ``/api/v1/favorites/``
    * **Body to send:** ``track`` (track_id)
    
    *1.4* **DELETE** | CASE: track is in favorites and user wants to remove it
    * **Route** ``/api/v1/favorites/<id>/``   
    

So basically we need track to play(1) , then we make history record if there is no one(1.1), if there is already a record we updated it - while user listening to the track we update time(1.2) so if user leave screen we can find that track to show him on home screen and ask him to continue playing if he did not finished. If he finished(1.2) we will show him that track in history. 

### END Audio Player Workflow ###

### START User History ###

*1.* **GET** | Get all history tracks of logged user
* **Route** - ``/api/v1/history/``
* **Response** `` id, is_finished, stopped_at, created, track: { id, title, subtitle, track, thumbnail, track_duration, intro_duration, created } ``

*2.* **GET** | Get tracks played that is not finished, show first record (which is last one) now on homescreen
* **Route** - ``/api/v1/history/?is_finished=false``
* **Response** `` id, is_finished, stopped_at, created, track: { id, title, subtitle, track, thumbnail, track_duration, intro_duration, created } ``
 
### END User History ###

### START User Favorites List ###

*1.* **GET** | Get all Favorites tracks of logged user
* **Route** - ``/api/v1/favorites/``
* **Response** `` id, created, track: { id, title, subtitle, track, thumbnail, track_duration, intro_duration, created } ``

### END User Favorites List ###