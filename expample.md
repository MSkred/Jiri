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