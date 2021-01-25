import React, { FC, useEffect, useState } from "react";
import { IActivity } from "../../../app/models/activity";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import agents from "../../../app/api/agents";
import { Link, RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

interface IActivityParameters {
  id: string | null;
}

interface IProps {
  routeProps: RouteComponentProps<IActivityParameters>;
  activity: IActivity;
  setSelectedActivity : (act: IActivity | null) => void;
}
export const ActivityDetails: FC<IProps> = ({routeProps, activity, setSelectedActivity}) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    agents.Activities.get(routeProps.match.params.id).then((response) => {
      setSelectedActivity(response);
    }).then(()=> setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content = "Loading activity..."/>
  return (
    (activity != null) &&
    <Card  style={{marginTop: '7em'}}>
      
      <Image
        src="../../../assets/placeholder.png"
        wrapped
        ui={false}
      />
      
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button
            as={Link} to={`/editActivity/${activity.id}`}
            color='blue'
          >Edit</Button>
          <Button 
            onClick={() => routeProps.history.push("/activities")} 
            color='grey'>Cancel</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
