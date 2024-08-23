# Endpoints :

## List of available endpoints:

### ENDPOINT

- POST /register
- POST /login
- POST /loginbygoogle
- GET /home/news
- GET /home/schedule
- GET /myclub
- POST /myclub
- DELETE /myclub/:id
- GET /myclub/search
- GET /myDreamClub
- POST /myDreamClub
- DELETE /myDreamClub/:id
- POST /myDreamCLub/generateLogo
- GET /searchplayer
- POST /setPlayer

### REQUEST :

## 1. POST /register

- Body

```JS
{
  "username": "String",
  "email": "String",
  "password": "String"
}
```

- Response (201 - Created)

```json
{
  "username": "New User",
  "email": "NewUser@gmail.com",
  "password": "password"
}
```

- Response (400 - Bad Request)

```json
{
  "message": "username is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

describe:

login page for get token and get access

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

- Response (200 - OK)

```json
{
  "access_token": "bearer string"
}
```

- Response (400 - Bad Request)

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

- Response (401 - Unauthorized)\_

```json
{
  "message": "email/password is invalid"
}
```

## 3. POST /loginbygoogle

Request:

- body:

```json
{
  "idToken": req.body.googleToken
}
```

- Response (200 - OK)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNhc2hhQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MjA5MDE1OTh9.H_HXn95GXI6DX_-INz4LnFz_MjWNnxXDddWyj9CqVCU",
  "username": "Sasha"
}
```

## 4. GET /home/news

Get all news in API as public ( without login/token )

Request:

- params:

```json
{
  "club_ids": "16,3",
  "locale": "IN",
  "page_number": `1`
}
```

- body:

```json
{
    "data": [
        {
            "id": "437842",
            "newsHeadline": "Bundesliga market values: Wirtz new league MVP - Kane drops, Sancho rebounds with BVB",
            "timestamp": 1716980266,
            "newsSecondImage": "https://tmssl.akamaized.net/images/logo/homepageSmall/l1.png?lm=1525905518",
            "newsDate": "May 29, 2024",
            "fullNewsDate": "Wednesday, May 29, 2024",
            "newsTime": "12:57",
            "newsSource": "Transfermarkt",
            "newsStartPageFlag": null,
            "newsShortMessageFlag": null,
            "newsTeaser": "489 players updated",
            "newsFirstImage": "https://img.a.transfermarkt.technology/portrait/medium/132098-1700211169.jpg?lm=1",
            "newsSpotlightFirstImage": "",
            "newsSpotlightSecondImage": "",
            "newsCategoryID": "14",
            "newsCategoryTag": "Market Values",
            "newsTickerFlag": "0",
            "newsUpdateFlag": "0",
            "newsAdFlag": "0",
            "spotlightPriority": "",
            "tags": {
                "clubs": {
                    "notTop": [
                        "27",
                        "15",
                        "16",
                        "23826",
                        "79",
                        "24",
                        "82",
                        "60",
                        "18",
                        "89",
                        "533",
                        "167",
                        "39",
                        "86",
                        "3",
                        "80",
                        "2036",
                        "105"
                    ]
                }
            }
        }...]}

```

## 5. GET /home/schedule

Get all schedule in API as public ( without login/token )

Request:

- params:

```json
{
  "locale": "IN",
  "competition_id": "GB1",
  "match_day": "29",
  "season_id": "2023"
}
```

- body:

```json
{
    "data": {
        "seasonID": "2023",
        "leagueID": "GB1",
        "dayID": "29",
        "tournamentFlag": "0",
        "share": {
            "title": "Premier League - Spielplan",
            "url": "https://www.transfermarkt.de/premier-league/spieltag/wettbewerb/GB1/plus/?saison_id=2023&amp;spieltag=29",
            "description": "Diese Übersicht zeigt einen Kurzüberblick aller Partien des Spieltages mit entsprechend relevanten Informationen."
        },
        "playDayMatches": [
            {
                "id": "4095362",
                "scoreradarID": null,
                "competitionID": "GB1",
                "competitionName": "Premier League",
                "competitionImage": "https://tmssl.akamaized.net/images/logo/normal/gb1.png?lm=1521104656",
                "tournamentFlag": "0",
                "round": "",
                "group": "",
                "matchDay": "29",
                "matchDate": "Mar 16, 2024",
                "fullMatchDate": "Saturday, March 16, 2024",
                "matchTime": "7:30 PM",
                "timestamp": 1710601200,
                "homeClubID": "1132",
                "homeClubName": "Burnley",
                "homeClubImage": "https://tmssl.akamaized.net/images/wappen/medium/1132.png?lm=1686818840",
                "awayClubID": "1148",
                "awayClubName": "Brentford",
                "awayClubImage": "https://tmssl.akamaized.net/images/wappen/medium/1148.png?lm=1625150543",
                "result": "2:1",
                "postponed": false,
                "nextRound": "",
                "resultObject": {
                    "result": "2:1",
                    "goalsHome": "2",
                    "goalsAway": "1",
                    "minute": 0,
                    "state": "100",
                    "destinationValue": 2,
                    "destinationDescription": "Spielbericht"
                }
            }, ...]}

```

## 6. GET /myclub

Describe :

Get myClub in database

### Request:

- headers:

```json
{
  "access_token": "Bearer string"
}
```

- Response (200 - OK)

```json
{
  "data": []
}
```

## 7. POST /myClub

Describe :

Create new club in myClub

### Request:

- Body

```json
{
  "club_name": "string",
  "club_logo": "string",
  "id_rapidAPI": "string",
  "user_id": "number"
}
```

- headers:

```json
{
  "access_token": "Bearer string"
}
```

- Response (201 - Created)

```json
{
  "club_name": "string",
  "club_logo": "string",
  "id_rapidAPI": "string",
  "user_id": "number"
}
```

- Response (400 - Bad Request)

```json
{
  "message": "club_name required"
}
or
{
  "message": "club_logo required"
}
or
{
  "message": "id_rapidAPI required"
}
or
{
  "message": "user_id required"
}
```

## 8. DELETE /myclub/:id

Description:

- Delete MyClub by id

Request:

- headers:

```json
{
  "access_token": "bearer string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- Response (200 - OK)\_

```json
{
  "message": `Success delete <name>`
}
```

- Response (404 - Not Found)\_

```json
{
  "message": "Myclub not found"
}
```

## 9. GET /myclub/search

Describe :

Get club with search by name

### Request:

- params:

```json
{
  "Page": "integer (required)",
  "limit": "integer (required)"
}
OR
{
   "filter[categoryId]": "integer (required)"
}
OR
{
  "search": "string (required)"
}
OR
{
  "sort": "-id to DSC id"
}
OR
{
  "sort": "id to ASC id"
}


```

- headers:

```json
{
  "access_token": "Bearer string"
}
```

- Response (200 - OK)

```json
{
  "data": []
}
```

## 10. GET /myDreamClub

Describe :

Get all cuisine in database

- Request:

- headers:

```json
{
  "access_token": "Bearer string"
}
```

- Response (200 - OK)

```json
{
  "data": []
}
```

## 11. POST /myDreamClub

Describe :

Create new club in myDreamClub

Request:

- Body

```json
{
  "club_name": "string",
  "club_logo": "string",
  "id_rapidAPI": "string",
  "user_id": "number"
}
```

- headers

````json
{
  "access_token": "Bearer string"
}

- Response (201 - Created)

```json
{
  "club_name": "string",
  "club_logo": "string",
  "id_rapidAPI": "string",
  "user_id": "number"
}

Response (400 - Bad Request)

```json

{
  "message": "club_name required"
}
or
{
  "message": "club_logo required"
}
or
{
  "message": "id_rapidAPI required"
}
or
{
  "message": "user_id required"
}

````

## 12 DELETE /myDreamClub/:id

Description

delete myDreamClub by id

- Requeest

headers

```json
{
  "access_token": "bearer string"
}
```

params

```json
{
  "id": "integer (required)"
}
```

Response (200 - OK)

```json
{
  "message": "Success delete <name>"
}
```

Response (404 - Not Found)

```json
{
  "message": "MyDreamClub not found"
}
```

## 13 POST /myDreamClub/generateLogo

- Request:

Body

```json
{
  "club_name": "string",
  "style": "string"
}
```

headers

```json
{
  "access_token": "Bearer string"
}
```

Response (201 - Created)

```json
{
  "club_name": "string",
  "club_logo": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "club_name required"
}
or
{
  "message": "style required"
}
```

## 14 GET /searchplayer

Describe :

Search player with input name in query

- Request :

headers

```json
{
  "access_token": "Bearer string"
}
```

params

```json
{
  "player_name": "string"
}
```

Response (200 - OK)

```json
{
  "data": []
}
```

Response (404 - Not Found)

```json
{
  "message": "Player not found"
}
```

## 15 POST /setPlayer

- Request :

Body

```json
{
  "player_name": "string",
  "player_nationality": "string",
  "player_age": "number",
  "player_position": "string",
  "club_id": "number"
}
```

headers

````json
{
  "access_token": "Bearer string"
}
```
Response (201 - Created)

```json
{
  "player_name": "string",
  "player_nationality": "string",
  "player_age": "number",
  "player_position": "string",
  "club_id": "number"
}
```
Response (400 - Bad Request)

```json
{
  "message": "player_name required"
}
or
{
  "message": "player_nationality required"
}
or
{
  "message": "player_age required"
}
or
{
  "message": "player_position required"
}
or
{
  "message": "club_id required"
}

```


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

````
