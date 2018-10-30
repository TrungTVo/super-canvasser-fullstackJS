import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {Delete, Edit} from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import currentUser from '../../data/currentUser';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone Number' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function BodySelected({user}) {
  if (user == null) {
    return (
      <div>
        <Grid container justify='center'>
          <Typography variant='title' id="modal-title">
            Error!
          </Typography>
        </Grid>
        <Grid container justify='center'>
          <Typography variant='subheading' id="simple-modal-description">
            Please select only 1 user to edit!
          </Typography>
        </Grid>
      </div>
    )
  } else {
    return (
      <div>
        <Grid container justify='center'>
          <Typography variant='display2' id="modal-title">
            Edit user
          </Typography>
        </Grid>
        <Grid container justify='center'>
          <Typography variant='title' id="modal-title">
            {user.firstName} {user.lastName}
          </Typography>
        </Grid>
        <Grid container justify='center'>
          <Typography variant='caption' id="simple-modal-description">
            @{user.username}
          </Typography>
        </Grid>
      </div>
    )
  }
}

class EnhancedTableToolbar extends React.Component {
  state = {
    open: false,
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEdit = () => {
    console.log('edit user');
    this.handleOpen();
  }
  handleDelete = () => {
    console.log('delete user');

  }
  handleTFchange = (e) => {
    console.log(e.target.value)
  }
  render() {
    const { numSelected, classes, users, index } = this.props;
    var user = {};
    if (numSelected === 1) {
      user = users[index[0]-1];
    } else {
      user = null;
    }

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant='title' id="tableTitle">
              Users list
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Edit">
              <IconButton onClick={this.handleEdit} aria-label="Edit">
                <Edit />
              </IconButton>
            </Tooltip>
          ) : (
            null
          )}
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          
          <div style={getModalStyle()} className={classes.paper}>
            <BodySelected user={user}/>
            <br/>
            {user == null ? null : 
              <form justify='center'>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>First Name:</Grid>
                  <Grid item xs={6}>
                      <TextField
                        className = 'firstName'
                        label='First Name'
                        onChange={this.handleTFchange}
                        defaultValue={user.firstName}
                        fullWidth={true} />
                  </Grid>
                </Grid>
      
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Last Name:</Grid>
                  <Grid item xs={6}> 
                      <TextField
                        className = 'lastName'
                        label='Last Name'
                        onChange={this.handleTFchange}
                        defaultValue={user.lastName}
                        fullWidth={true} />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Username:</Grid>
                  <Grid item xs={6}> 
                      <TextField
                        className = 'username'
                        label='Username'
                        onChange={this.handleTFchange}
                        defaultValue={user.username}
                        fullWidth={true} />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Email address:</Grid>
                  <Grid item xs={6}> 
                      <TextField
                        className = 'email'
                        label='Email address'
                        onChange={this.handleTFchange}
                        defaultValue={user.email}
                        fullWidth={true} />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Phone:</Grid>
                  <Grid item xs={6}> 
                      <TextField
                        className = 'phone'
                        label='Phone number'
                        onChange={this.handleTFchange}
                        defaultValue={user.phone}
                        fullWidth={true} />
                  </Grid>
                </Grid>
              </form>
            }
            <Grid container justify='center'>
              {numSelected === 1? <div><br/><Button variant="contained" color="primary" style={{marginTop:'15px', marginRight: '8px'}}> Update </Button></div> : null}
              {numSelected === 1? <div><br/><Button onClick={this.handleClose} variant="contained" color="default" style={{marginTop:'15px'}}> Cancel </Button></div> : null}
              {numSelected === 1? null : <Button onClick={this.handleClose} variant="contained" color="primary" style={{marginTop: '15px'}}> Close </Button>}
            </Grid>
          </div>
          
        </Modal>
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={this.handleDelete} aria-label="Delete">
                <Delete />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class TableUsers extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
  };
  componentDidMount(props) {
    // fetching from back-end server
    fetch('/users')
      .then(res => res.json())
      .then(users => 
        // set data to list of canvassers
        this.setState({
          data: users
        })
      )
      .catch(err => console.log(err))

  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log(this.state.data[id-1]);

    window.location.href = '/users/admin/' + currentUser[0].username + '/add?id='+id + '&firstName=' + this.state.data[id-1].firstName+ '&lastName=' + this.state.data[id-1].lastName+ '&username=' + this.state.data[id-1].username+ '&email=' + this.state.data[id-1].email+ '&role=' + this.state.data[id-1].role+'&phone=' + this.state.data[id-1].phone;

    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} users={data} index={selected}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      
                      <TableCell> {n.firstName} </TableCell>
                      <TableCell> {n.lastName} </TableCell>
                      <TableCell> {n.username} </TableCell>
                      <TableCell> {n.role} </TableCell>
                      <TableCell> {n.email} </TableCell>
                      <TableCell> {n.phone} </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

TableUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableUsers);

