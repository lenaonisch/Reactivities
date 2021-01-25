import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agents from "../api/agents";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ActivityForm } from "../../features/forms/ActivityForm";
import { LoadingComponent } from "./LoadingComponent";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSelectActivity = (id: String) => {
    setEditMode(false);
    let activity = activities.filter((act) => {
      return act.id === id;
    })[0];
    
    if (activity == null){
      agents.Activities.get(id.valueOf()).then((response)=> {setSelectedActivity(response)} )
    } else { 
      setSelectedActivity(activity);
    }
  };

  const handleCreateActivity = (activity: IActivity) => {
    agents.Activities.add(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    agents.Activities.edit(activity).then(() => {
      setActivities([
        ...activities.filter((t) => t.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    agents.Activities.delete(id).then(() => {
      setActivities([...activities.filter((t) => t.id !== id)]);
      setSelectedActivity(null);
      setEditMode(false);
    });
  };

  useEffect(() => {
    agents.Activities.list().then((response) => {
      let newActivities: IActivity[] = [];
      response.forEach((activity) => {
        let dateParts = activity.date.split(":");
        activity.date = dateParts[0] + ":" + dateParts[1];
        newActivities.push(activity);
      });
      setActivities(newActivities);
    }).then(()=> setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content = "Loading activities..."/>
  return (
    <Fragment>
      <Container>
        <NavBar/>
  
        <Route exact path="/" component={HomePage} />

        <Route exact path="/activities">
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            createActivity={handleCreateActivity}
            editActivity={handleEditActivity}
            deleteActivity={handleDeleteActivity}
          />
        </Route>
        <Route 
          path={["/editActivity/:id", "/createActivity"]}
          render={(props)=>
                  <ActivityForm
                  routeProps={props}
                  activity={selectedActivity}
                  createActivity={handleCreateActivity}
                  editActivity={handleEditActivity}
                  ></ActivityForm>}
        > 
        </Route>
        <Route 
          exact path="/activities/:id"
          render={(props)=>  
            <ActivityDetails
              routeProps={props}
              activity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
            ></ActivityDetails>}>
        </Route>
      </Container>
    </Fragment>
  );
};

export default App;
