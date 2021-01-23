import React, { useState, FC, useEffect } from "react";
import {
  Form,
  Button,
  DropdownItemProps,
  TextArea,
  Input,
} from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid} from 'uuid';
import agents from "../../app/api/agents";

interface IProps {
 // categoryOptions: DropdownItemProps[];
  activity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity:IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: FC<IProps> = ({
  activity: initialActivity,
  setEditMode,
  createActivity,
  editActivity
}) => {
  const initActivity = () => {
    if (initialActivity != null) {
      return initialActivity;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        vanue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initActivity);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    
    if (activity.id.length === 0)
    {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const [categoryOptions, setCategories] = useState<DropdownItemProps[]>();

  useEffect(() => {
    let dropDownCategories: DropdownItemProps[] = [];
    agents.Categories.list().then((response) => {
      
        response.forEach((category) => {
          dropDownCategories.push({ key: category, text: category, value: category });
        })
        setCategories(dropDownCategories);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit} style={{marginTop:"5em"}}>
      <Form.Field
        onChange={handleInputChange}
        name="title"
        label="Title"
        control={Input}
        placeholder="Title"
        value={activity.title}
      ></Form.Field>
      <Form.Select 
        onChange={handleInputChange}
        options={categoryOptions}
        label="Category"
        name="category">
      </Form.Select>
      <Form.Field
        onChange={handleInputChange}
        name="description"
        label="Description"
        control={TextArea}
        placeholder="Description"
        value={activity.description}
      ></Form.Field>
      <Form.Input
        onChange={handleInputChange}
        name="date"
        type="datetime-local"
        label="Date"
        placeholder="Date"
        value={activity.date}
      ></Form.Input>
      <Form.Field
        onChange={handleInputChange}
        name="city"
        label="City"
        placeholder="City"
        control={Input}
        value={activity.city}
      ></Form.Field>
      <Form.Field
        onChange={handleInputChange}
        name="vanue"
        label="Vanue"
        control={Input}
        placeholder="Vanue"
        value={activity.vanue}
      ></Form.Field>
      <Button onClick={() => setEditMode(false)} type="button">
        Cancel
      </Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
};
