import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import EditOutlined from '@material-ui/icons/EditOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import { Button, IconButton, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import paths from "../../configs/paths.config";
import StationDetails from "../../types/Station.type";
import { RootState } from "../../reducers/root.reducer";
import { fetchListStations, deleteStation } from "../../reducers/station.reducer"
import { getUsers } from "../../reducers/user.reducer";
import AddStationDialog from "./AddStationDialog"

import '../../styles/components/Home/Home.scss';

const statesToProps = (state: RootState) => ({
    stations: state.stationReducer.listStations,
    users: state.userReducer.listUsers,
});

const dispatchToProps = {
    fetchListStations,
    deleteStation,
    getUsers
};

const connector = connect(statesToProps, dispatchToProps);

type HomeProps = ConnectedProps<typeof connector>;

const Home = ({
    stations,
    users,
    fetchListStations,
    deleteStation,
    getUsers }: HomeProps) => {
    const [selected, setSelected] = useState(0);
    const [addStationDialog, setAddStationDialog] = useState(false);
    const [editStationDialog, setEditStationDialog] = useState(false);

    useEffect(() => {
        fetchListStations();
        getUsers();
    }, []);

    const openAddStationDialog = () => {
        setAddStationDialog(true);
    }

    const closeAddStationDialog = () => {
        setAddStationDialog(false);
    }

    // const openEditCatDialog = (cat: Category) => {
    //     setSelectedCat(cat);
    //     setEditCatDialog(true);
    // }

    // const closeEditCatDialog = () => {
    //     setEditCatDialog(false);
    // }

    const handleDeleteStation = (station: StationDetails) => {
        if (window.confirm(`Are you sure you want to delete ${station.name}?`)) {
            deleteStation(station._id);
        };
    }

    return (
        <div className='container'>
            <div className='sidebar'>
                <div
                    className='header'>
                    <img alt='logo' className='logo' />
                    <p className='title-admin'>Administrator</p>
                </div>
                <img alt='avatar' className='avatar' />
                <p className='name'>fullname</p>
                <div style={selected === 0 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(0)} className='sideOptions'>
                    <AccountCircle style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 0 ? { color: '#e73e3e' } : {})} className='icon' />
                    <p style={selected === 0 ? { color: '#e73e3e' } : {}} className='text'>Users</p>
                </div>
                <div style={selected === 1 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(1)} className='sideOptions'>
                    <LocalGasStationIcon style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 1 ? { color: '#e73e3e' } : {})} className='icon' />
                    <p style={selected === 1 ? { color: '#e73e3e' } : {}} className='text'>Stations</p>
                </div>
                {/* <div style={selected === 2 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(2)} className='sideOptions'>
                    <CategoryOutlined style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 2 ? { color: '#e73e3e' } : {})} className='icon' />
                    <p style={selected === 2 ? { color: '#e73e3e' } : {}} className='text'>Categories</p>
                </div> */}
            </div>
            <div className='content'>
                {selected === 0 && <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        {users.length > 0 && <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.role}</TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>}
                    </Table>
                </TableContainer>}
                {selected === 1 && <TableContainer component={Paper}>
                    <Table stickyHeader className='table' aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Total Tank</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Working Time</TableCell>
                                <TableCell align="center">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        {stations.length > 0 && <TableBody>
                            {stations.map((station) => (
                                <TableRow key={station._id}>
                                    <TableCell align="center">{station.name}</TableCell>
                                    <TableCell align="center">{station.description}</TableCell>
                                    <TableCell align="center">{station.total_tank}</TableCell>
                                    <TableCell align="center">{station.address}</TableCell>
                                    <TableCell align="center">{station.working_hour_from}h to {station.working_hour_to}h</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleDeleteStation(station)}
                                            color="secondary"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>}
                    </Table>
                </TableContainer>}
                <div hidden={selected !== 1} className="Home__buttons-custom">
                    <Button className='Home__buttons' onClick={openAddStationDialog} >Add Station</Button>
                </div>
            </div>
            <AddStationDialog open={addStationDialog} onClose={closeAddStationDialog} />
        </div>
    )
}

export default withRouter(connector(Home));