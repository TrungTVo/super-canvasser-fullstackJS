import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Login from './Login';
import Register from './Register';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from '@material-ui/icons';
import {BrowserRouter, Route } from 'react-router-dom';
import ReactTable from "react-table";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
