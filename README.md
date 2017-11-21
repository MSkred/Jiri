# Jiri project
> The Jiri project is a school project that uses a MVC structure.
* * *
* [Website](http://localhost:3000)
* [GraphiQL](http://localhost:3000/graphiql)
* [Database structure](https://github.com/MaximeScibetta/Jiri/blob/master/database_structure.jpg)
* * *
## Start the project
Go to the `C:\Program Files\MongoDB\Server\3.4\bin` folder and execute `mongod`

Go to your `project_folder` and exectue `npm run dev3`

## Query example
### [GraphiQL Test](http://localhost:3000/graphiql?query=%7B%0A%20%20students%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20projects%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%09event_id%20%7B%0A%20%20%20%20%09%20%20name%0A%20%20%20%20%09%7D%0A%20%20%20%20%7D%0A%20%20%20%20meetings%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20hour%0A%20%20%20%20%20%20user_id%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20events%7B%0A%20%20%20%20id%0A%20%20%20%20meetings%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20user_id%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)
### Request
```
{
  students {
    id
    name
    projects {
      id
      name
    	event_id {
    	  name
    	}
    }
    meetings {
      id
      hour
      user_id{
        name
      }
    }
  }
  events{
    id
    meetings {
      id
      user_id {
        name
      }
    }
  }
}
```
### Response
```json
{
  "data": {
    "students": [
      {
        "id": "Iwjj1hwXz3SJUuLHxMGNU",
        "name": "Maxime",
        "projects": [
          {
            "name": "Saint-Léon'Art",
            "event_id": [
              {
                "name": "Jury de 3ème année"
              }
            ]
          },
          {
            "name": "Saint-Léon'Art",
            "event_id": [
              {
                "name": "Jury de 3ème année"
              }
            ]
          },
          {
            "name": "Saint-Léon'Art",
            "event_id": [
              {
                "name": "Jury de 3ème année"
              }
            ]
          }
        ],
        "meetings": [
          {
            "id": "mLErpncL40ePZR979oK4i",
            "hour": "8:45 à 9:30",
            "user_id": [
              {
                "name": "Dominique Vilain"
              }
            ]
          },
          {
            "id": "yUaSmdJNthveIaoWeB4SB",
            "hour": "8:45 à 9:30",
            "user_id": [
              {
                "name": "Dominique Vilain"
              }
            ]
          },
          {
            "id": "4XbAjuljQ9aO3FsF8wCXm",
            "hour": "8:45 à 9:30",
            "user_id": [
              {
                "name": "Dominique Vilain"
              }
            ]
          }
        ]
      },
      {
        "id": "UpP6LuI5alEprbw9crFfs",
        "name": "Maxime",
        "projects": [],
        "meetings": []
      }
    ],
    "events": [
      {
        "id": "g~RvfjQRhb3UJq6yBDr9h",
        "meetings": [
          {
            "id": "mLErpncL40ePZR979oK4i",
            "user_id": [
              {
                "name": "Dominique Vilain"
              }
            ]
          },
          {
            "id": "yUaSmdJNthveIaoWeB4SB",
            "user_id": [
              {
                "name": "Dominique Vilain"
              }
            ]
          },
          {
            "id": "4XbAjuljQ9aO3FsF8wCXm",
            "user_id": [
              {
                "name": "Dominique Vilain"
              }
            ]
          }
        ]
      },
      {
        "id": "En6WTAzy5G8liaf7tKJ36",
        "meetings": []
      },
      {
        "id": "JGLQIUGoC6aYYCtbLHEBU",
        "meetings": []
      }
    ]
  }
}
```