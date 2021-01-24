import React, { FC, useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../../forms/ActivityForm";
import { ActivityFilter } from "./ActivityFilter";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setSelectedActivity : (act: IActivity | null) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity:IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityDashboard: FC<IProps> = (props) => {
  

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Column width="10">
        <ActivityList
          activities={props.activities}
          selectActivity={props.selectActivity}
          deleteActivity={props.deleteActivity}
        />
      </Grid.Column>
      {props.selectedActivity && (
        <Grid.Column width="6">
          <ActivityFilter/>
          {/* {props.selectedActivity != null && !props.editMode && (
            <ActivityDetails
              activityId={props.selectedActivity.id}
              activity={props.selectedActivity}
              setEditMode={props.setEditMode}
              setSelectedActivity={props.setSelectedActivity}
            />
          )}
          {props.editMode && (
            <ActivityForm
              key={props.selectedActivity.id && props.selectedActivity.id || 0}
              activity={props.selectedActivity}
              setEditMode={props.setEditMode}
              createActivity={props.createActivity}
              editActivity={props.editActivity}
            ></ActivityForm>
          )} */}
          
        </Grid.Column>
      )}
      {/* {props.editMode &&(
        <Grid.Column width="6">
            <ActivityForm
              activity={props.selectedActivity}
              setEditMode={props.setEditMode}
              createActivity={props.createActivity}
              editActivity={props.editActivity}
            ></ActivityForm>
        </Grid.Column>
      )} */}
    </Grid>
  );
};
