import React, { FC } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

interface IProps {
 
}

export const NavBar: FC<IProps> = (props) => {

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item
          header
          name="home"
          as={NavLink}
          exact
          to="/"
        >
          <img src="../../../logo.png" style={{ marginRight: 10 }} />
          Home
        </Menu.Item>
        <Menu.Item
          name="Activities"
          as={NavLink}
          to="/activities"
        />
        <Menu.Item
          name="createActivity"
        >
          <Button
            positive
            content="Create activity"
            as={NavLink}
            to="createActivity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
