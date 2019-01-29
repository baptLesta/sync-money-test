# Update Current User

Allow the Authenticated User to update their details.

**URL** : `/api/data/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

```json
{
    "data": {
        "value": alphanumeric
    },
}
```

**Data examples**

```json
{
    "data": {
        "value": "YoooSync"
    }
}
```

## Success Responses


**Code** : `201 Created`

**Content example** : Response will reflect back the data created with the value crypted.

```json
{
    "id": 1234,
    "first_name": "Joe",
    "last_name": "Bloggs",
    "email": "joe25@example.com",
    "uapp": "ios1_2"
}
```

# List All The Data

Get all the datas.

**URL** : `/api/data/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 1234 on the local database where that User has saved an
email address and name information.

```json
{
    "data": [
        {
            "_id": "5c505abf2b52a820edf6f6f7",
            "value": "SyncMoneyIsExtraCool",
            "__v": 0,
            "id": "5c505abf2b52a820edf6f6f7"
        },
        {
            "_id": "5c5061da21f5682bd6f9a449",
            "value": "Yooo",
            "__v": 0,
            "id": "5c5061da21f5682bd6f9a449"
        }
    ],
    "success": true
}
```
