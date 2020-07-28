import React from 'react';
import { Dropdown } from 'react-bootstrap';
import classes from './Dropdown.module.css';

const dropdown = props => (
    <Dropdown className={classes.Dropdown}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
);

export default dropdown;