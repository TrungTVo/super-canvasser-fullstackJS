import React from 'react';
import '../../css/manager.css';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableLocations from './TableLocations';
import MyMap from '../../api/MyMapComponent';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import TextField from '@material-ui/core/TextField';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

const field_style = {
   width: 300,
   color: "#ffffff",
};

class ManagerLocationsList extends React.Component {
  render() {
    return (
      <div style={style}>
        <Manager/>
        <br/>

        <div className='locationlist'>
          <Tabs
            defaultTab="one"
            onChange={(tabId) => { console.log(tabId) }} >
            
            <TabList>
              <Tab tabFor="one">View locations list</Tab>
              <Tab tabFor="two">Add location</Tab>
            </TabList>
            
            <TabPanel tabId="one" className='tab1-content'>
              <Grid container>
                <Grid item xs={12}>
                  <div className="manager-location-list">
                    <br/>
                    <h1>Locations list:</h1>
                    <TableLocations/>
                  </div>
                </Grid>
                <Grid item xs={12} >
                  <div className='manager-map'>
                    <br/> <h1>Map</h1> <br/>
                    <MyMap/>
                  </div>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel tabId="two">
              <form className="form" justify='center'>
                 <Grid container spacing={8} alignItems="flex-end" justify='center'>
                    <Grid item md={4}>Longitude:</Grid>
                    <Grid item md={8}>
                       <TextField
                          className = 'longitude'
                          label='Longitude'
                          style={field_style} />
                    </Grid>
                 </Grid>

                 <Grid container spacing={8} alignItems="flex-end" justify='center'>
                    <Grid item md={4}>Latitude:</Grid>
                    <Grid item md={8}>
                       <TextField
                          className = 'latitude'
                          label='Latitude'
                          style={field_style} />
                    </Grid>
                 </Grid>
                 
                 <Grid container spacing={8} alignItems="flex-end" justify='center'>
                    <Grid item md={4}>Talking point:</Grid>
                    <Grid item md={8}>
                       <TextField
                          className = 'talkingPoint'
                          label='Talking point'
                          style={field_style} />
                    </Grid>
                 </Grid>    

                 <Grid container spacing={8} alignItems="flex-end" justify='center'>
                    <Grid item md={4}>Visit duration:</Grid>
                    <Grid item md={8}>
                       <TextField
                          className = 'duration'
                          label='Visit duration'
                          style={field_style} />
                    </Grid>
                 </Grid> 
                 <br/><br/>
                 <Button variant="outlined"> Add </Button>           
              </form>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  };
}

export default ManagerLocationsList;
