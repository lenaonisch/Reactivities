import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: String) => {
    setEditMode(false);
    setSelectedActivity(
      activities.filter((act) => {
        return act.id === id;
      })[0]
    );
  };

  const handelCreateEditForm = () => {
    
    setEditMode(true);
    setSelectedActivity(null);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(t => t.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(t => t.id !== id)]);
    setSelectedActivity(null);
    setEditMode(false);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        let newActivities: IActivity[] = [];
        response.data.forEach(activity => {
          let dateParts = activity.date.split(':')
          activity.date = dateParts[0] +":"+ dateParts[1];
          newActivities.push(activity);
        })
        setActivities(newActivities);
      });
  }, []);

  return (
    <Fragment>
      <Container>
        <NavBar openCreateForm={handelCreateEditForm}/>
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
      </Container>
    </Fragment>
  );
};

export default App;
