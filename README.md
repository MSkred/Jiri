# Jiri project
> The Jiri project is a school project that uses a MVC structure.
* * *
* [Website](http://localhost:3000)
* [GraphiQL](http://localhost:3000/graphiql)
* [Database structure]
* * *
## Start the project
Go to the `C:\Program Files\MongoDB\Server\3.4\bin` folder and execute `mongod`

Go to your `project_folder` and exectue `npm run dev3`

## Query example

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