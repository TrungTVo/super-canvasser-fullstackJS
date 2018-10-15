import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../css/manager.css';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { Table } from 'react-bootstrap';
import TableCanvassers from './TableCanvassers';


class ManagerCanvassersList extends React.Component {
  render() {
    return (
      <div>
        <Manager/>
        <div className="canvasserlist">
          <br/><h1>Canvassers list</h1>
          <TableCanvassers/>
        </div>
      </div>
    );
  };
}

export default ManagerCanvassersList;

