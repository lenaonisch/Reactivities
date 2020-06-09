import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Header, List, Icon } from 'semantic-ui-react'

class App extends Component {
  state = {
    values: []
  }

  componentDidMount(){
    axios.get("http://localhost:5000/Values")
    .then((response)=>{
      this.setState({
        values:response.data
      })
    })
  }

  render(){
    return (
      <div>
          <Header as='h2'>
            <Icon name='users' />
              <Header.Content>Reactivities</Header.Content>
          </Header>
          <List bulleted>
            {this.state.values.map((value: any) =>
              (<List.Item key={value.id}>{value.name}</List.Item>)
            )}
          </List>
    
            
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
       
      </div>
    );
  }

  
}

export default App;
